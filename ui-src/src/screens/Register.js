import { Button, Input, Label, P } from '../styles/styledHtml'

import React from 'reactn'
import { Redirect } from 'react-router-dom'

import { hcRegisterUser } from '../holochain/profile'

class ScreensRegister extends React.Component {
  uiRedirectToStart() {
    const { user, hc } = this.global

    if (hc.connected && user.registered === true) {
      return <Redirect to="/" />
    }
    return null
  }

  uiRegisterScreen() {
    return (
      <div className="measure">
        {this.uiRedirectToStart()}
        <P.std>
          It looks like this is the first time using Hologistics with this
          agent. Register a usename and avatar for this agent ID.
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
            hcRegisterUser({
              name,
              avatarURL,
              description
            })
          }}
        >
          <Label.std htmlFor="handle">Username</Label.std>
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
