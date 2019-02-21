import React from 'react'
import { Redirect } from 'react-router-dom'

import { connect } from '@holochain/hc-web-client'
import style from './index.module.css'

const placeholder =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

class UserHeader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      holochainConnection: connect('ws://localhost:3400'),
      connected: false,
      user: {}
    }
  }

  componentDidMount () {
    this.state.holochainConnection.then(({ call }) => {
      call('events-goer-4000/event/get_my_member_profile')({}).then((result) => {
        const profile = JSON.parse(result).Ok
        if (profile) {
          this.setState({ user: { id: profile.address, name: profile.name, avatarURL: profile.avatar_url, description: profile.description } })
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
      connected
    } = this.state

    return (
      <header className={style.component}>
        <img src={user.avatarURL || placeholder} alt='' />
        <div>
          <h3>{user.name}</h3>
          <h5>{user.id && `@${user.id.substring(0, 15)}`}</h5>
        </div>

        { connected ? user.name ? '' : <Redirect to='/register' /> : ''}
      </header>
    )
  }
}

export default UserHeader
