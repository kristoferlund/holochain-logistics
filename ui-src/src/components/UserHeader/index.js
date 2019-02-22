import React from 'react'
import { Redirect } from 'react-router-dom'

import { connect } from '@holochain/hc-web-client'

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

  uiRedirectToRegister () {
    const {
      user,
      connected
    } = this.state

    const { pathname } = window.location

    if (connected && !user.name && pathname !== '/register') {
      return <Redirect to='/register' />
    }
    return null
  }

  render () {
    const {
      user,
      connected
    } = this.state

    return (
      <header className='flex flex-column black-70 ph5-ns mt3'>
        {this.uiRedirectToRegister()}
        <div className='flex mv2'>
          <img src={user.avatarURL || placeholder} alt='' className='br4 h3 w3 dib bg-light-gray' style={{ objectFit: 'cover' }} />
          <div className='ma2'>
            <div class='f4 lh-copy'>{user.name ? user.name : 'Username'}</div>
            <div class='f7 lh-copy'>{user.id ? user.id && `@${user.id.substring(0, 15)}` : 'User id'}</div>
          </div>
        </div>
        <div className='f6 measure lh-copy'>
          { connected ? '✅ Holochain: Connected' : '❌ Holochain: Not connected' }
        </div>
      </header>
    )
  }
}

export default UserHeader
