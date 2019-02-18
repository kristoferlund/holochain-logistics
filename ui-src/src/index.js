import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { connect } from '@holochain/hc-web-client'

import { UserHeader } from './components/UserHeader'
import { EventList } from './components/EventList'
import { CreateEventForm } from './components/CreateEventForm'
import { WelcomeScreen } from './components/WelcomeScreen'
import { RegisterScreen } from './components/RegisterScreen'

// --------------------------------------
// Application
// --------------------------------------

class View extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // holochainConnection: connect('ws://localhost:3400'),
      holochainConnection: connect(),
      connected: false,
      user: {},
      users: {},
      event: {},
      events: [],
      messages: {},
      sidebarOpen: false
    }

    this.actions = {
      // --------------------------------------
      // UI
      // --------------------------------------

      setSidebar: sidebarOpen => this.setState({ sidebarOpen }),

      // --------------------------------------
      // User
      // --------------------------------------

      setUser: user => {
        this.setState({ user })
        this.actions.getEvents()
      },

      // --------------------------------------
      // Event
      // --------------------------------------

      setEvent: event => {
        this.setState({ event, sidebarOpen: false })
        this.actions.getMessages(event.id)
        this.actions.getEventMembers(event.id)
        this.actions.scrollToEnd()
      },

      joinEvent: event => {
        console.log('joining event')
        this.actions.setEvent(event)
        this.makeHolochainCall('events-goer-4000/event/join_event', { event_address: event.id }, (result) => {
          console.log('joined event', result)
        })
      },

      getEventMembers: eventId => {
        this.makeHolochainCall('events-goer-4000/event/get_members', {
          event_address: eventId
        }, (result) => {
          console.log('retrieved members', result)
          const users = result.Ok
          users.forEach(address => {
            this.actions.getUserProfile(address)
          })
          this.setState({
            event: { ...this.state.event, users }
          })
        })
      },

      sendMessage: ({ text, eventId }) => {
        const message = {
          message_type: 'text',
          timestamp: Math.floor(Date.now() / 1000),
          payload: text,
          meta: ''
        }
        this.makeHolochainCall('events-goer-4000/event/post_message', {
          event_address: eventId,
          message
        }, (result) => {
          console.log('message posted', result)
          setTimeout(() => this.actions.getMessages(eventId), 1000) // hack for now
          this.actions.scrollToEnd()
        })
      },

      getMessages: (eventId) => {
        this.makeHolochainCall('events-goer-4000/event/get_messages', { address: eventId }, (result) => {
          console.log('retrieved messages', result)

          const eventMessages = result.Ok.map(({ address, entry }) => ({
            text: entry.payload,
            sender: entry.author,
            createdAt: entry.timestamp,
            id: address
          }))

          this.setState({
            messages: { ...this.state.messages, [eventId]: eventMessages }
          })
        })
      },

      createEvent: options => {
        const eventSpec = {
          name: options.name,
          description: options.description,
          initial_members: []
        }
        this.makeHolochainCall('events-goer-4000/event/create_event', eventSpec, (result) => {
          console.log('created event', result)
          this.actions.setEvent({
            id: result.Ok,
            name: options.name,
            description: options.description,
            users: []
          })
          this.actions.getEvents()
        })
      },

      getUserProfile: userId => {
        this.makeHolochainCall('events-goer-4000/event/get_member_profile', { agent_address: userId }, (result) => {
          console.log('retrieved profile', result)
          this.setState({
            users: { ...this.state.users, [userId]: result.Ok }
          })
        })
      },

      getEvents: () => {
        this.makeHolochainCall('events-goer-4000/event/get_all_public_events', {}, (result) => {
          console.log('retrieved public events', result)
          let events = result.Ok.map(({ address, entry }) => {
            return {
              id: address,
              private: !entry.public,
              name: entry.name,
              description: entry.description,
              users: []
            }
          })
          this.setState({
            events
          })
        })
      },

      registerUser: ({ name, avatarURL }) => {
        this.makeHolochainCall('events-goer-4000/event/register', { name, avatar_url: avatarURL }, result => {
          console.log('registered user', result)
          this.actions.setUser({ id: result.Ok, name, avatarURL })
        })
      },

      scrollToEnd: e =>
        setTimeout(() => {
          const elem = document.querySelector('#messages')
          elem && (elem.scrollTop = 100000)
        }, 0)

    }
  }

  componentDidMount () {
    this.state.holochainConnection.then(({ call }) => {
      call('events-goer-4000/event/get_my_member_profile')({}).then((result) => {
        const profile = JSON.parse(result).Ok
        if (profile) {
          console.log('registration user found with profile:', profile)
          this.actions.setUser({ id: profile.address, name: profile.name, avatarURL: profile.avatar_url })
        } else {
          console.log('User has not registered a profile. Complete the form to proceed')
        }
        this.setState({ connected: true })
      })
    })
  }

  makeHolochainCall (callString, params, callback) {
    this.state.holochainConnection.then(({ call }) => {
      call(callString)(params).then((result) => callback(JSON.parse(result)))
    })
  }

  render () {
    const {
      user,
      users,
      event,
      events,
      messages,
      sidebarOpen,
      connected
    } = this.state
    const { createEvent, registerUser } = this.actions

    return (
      <main>
        <section data-open={sidebarOpen}>
          <UserHeader sidebarOpen={sidebarOpen} user={user} setSidebar={this.actions.setSidebar} />
          {user.id && <CreateEventForm submit={createEvent} />}
          {user.id && <EventList
            state={this.state}
            user={user}
            users={users}
            events={events}
            messages={messages}
            current={event}
            actions={this.actions}
          />}
          { connected ? (
            user.id ? null : <RegisterScreen registerUser={registerUser} />
          ) : (
            <WelcomeScreen message='Connecting to Holochain... Make sure the conductor is running and try refreshing the page' />
          )}
        </section>
      </main>
    )
  }
}

ReactDOM.render(<View />, document.querySelector('#root'))
