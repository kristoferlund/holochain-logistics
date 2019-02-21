import React from 'react'
import { Redirect } from 'react-router-dom'

import { connect } from '@holochain/hc-web-client'

class RegisterScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      holochainConnection: connect('ws://localhost:3400'),
      connected: false,
      userHasProfile: false
    }

    this.actions = {

      registerUser: ({ name, avatarURL, description }) => {
        this.makeHolochainCall('events-goer-4000/event/register', { name, avatar_url: avatarURL, description }, () => {
          this.setState({ userHasProfile: true })
        })
      }
    }
  }

  componentDidMount () {
    this.state.holochainConnection.then(({ call }) => {
      call('events-goer-4000/event/get_my_member_profile')({}).then((result) => {
        const profile = JSON.parse(result).Ok
        if (profile) {
          this.setState({ userHasProfile: true })
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

  uiRegisterScreen () {
    const { registerUser } = this.actions

    return (
      <div className='measure'>
        <p>
        It looks like this is the first time using Events Goer 4000 with this agent. Register a handle and avatar for this agent ID.
        </p>
        <form
          onSubmit={e => {
            e.preventDefault()

            const name = e.target[0].value
            const avatarURL = e.target[1].value
            const description = e.target[2].value

            if (name.length === 0) {
              return
            }
            registerUser({
              name,
              avatarURL,
              description
            })
          }}
        >
          <input placeholder='input @handle' className='input-reset ba b--black-20 pa2 mb2 db w-100' />
          <input placeholder='paste url for avatar image' className='input-reset ba b--black-20 pa2 mb2 db w-100' />
          <input placeholder='description' className='input-reset ba b--black-20 pa2 mb2 db w-100' />
          <button type='submit' className='button-reset f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green'>Register!</button>
        </form>
      </div>
    )
  }

  render () {
    const { connected, userHasProfile } = this.state
    return (
      <div>
        { connected ? userHasProfile ? <Redirect to='/' /> : this.uiRegisterScreen() : ''}
      </div>
    )
  }
}

export default RegisterScreen
