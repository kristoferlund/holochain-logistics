import React from 'react'

import { connect } from '@holochain/hc-web-client'

import { Input, Label, P, Button } from '../styles/styledHtml'

class ScreensRegister extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      holochainConnection: connect('ws://localhost:3400'),
      connected: false,
      userHasProfile: false
    }

    this.actions = {
      registerUser: ({ name, avatarURL, description }) => {
        this.makeHolochainCall(
          'events-goer-4000/event/register',
          { name, avatar_url: avatarURL, description },
          () => {
            this.setState({ userHasProfile: true })
          }
        )
      }
    }
  }

  componentDidMount() {
    this.state.holochainConnection.then(({ call }) => {
      call('events-goer-4000/event/get_my_member_profile')({}).then(result => {
        const profile = JSON.parse(result).Ok
        if (profile) {
          this.setState({ userHasProfile: true })
        }
        this.setState({ connected: true })
      })
    })
  }

  makeHolochainCall(callString, params, callback) {
    this.state.holochainConnection.then(({ call }) => {
      call(callString)(params).then(result => callback(JSON.parse(result)))
    })
  }

  uiRegisterScreen() {
    const { registerUser } = this.actions

    return (
      <div className="measure">
        <P.std>
          It looks like this is the first time using Hologistics with this
          agent. Register a handle and avatar for this agent ID.
        </P.std>
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
          <Label.std htmlFor="handle">Input @handle</Label.std>
          <Input.std id="handle" />

          <Label.std htmlFor="avatar">Avatar image url</Label.std>
          <Input.std id="avatar" />

          <Label.std htmlFor="description">Description</Label.std>
          <Input.std id="description" />

          <Button.std type="submit">Register!</Button.std>
        </form>
      </div>
    )
  }

  render() {
    return <div>{this.uiRegisterScreen()}</div>
  }
}

export default ScreensRegister
