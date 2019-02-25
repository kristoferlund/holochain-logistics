import React from 'reactn'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

const placeholder =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

class UserHeader extends React.Component {
  uiRedirectToRegister() {
    const { user, connected } = this.global

    const { pathname } = window.location

    if (connected && !user.name && pathname !== '/register') {
      return <Redirect to="/register" />
    }
    return null
  }

  render() {
    const { user, hc } = this.global

    return (
      <header className="flex flex-column black-70 ph5-ns mt3">
        {this.uiRedirectToRegister()}
        <div className="flex mv2">
          <img
            src={user.avatarURL || placeholder}
            alt=""
            className="br4 h3 w3 dib bg-light-gray"
            style={{ objectFit: 'cover' }}
          />
          <div className="ma2">
            <div className="f4 lh-copy">
              {user.name ? user.name : 'Username'}
            </div>
            <div className="f7 lh-copy">
              {user.id ? user.id && `@${user.id.substring(0, 15)}` : 'User id'}
            </div>
          </div>
        </div>
        <div className="f6 measure lh-copy">
          {hc.connected
            ? '✅ Holochain: Connected'
            : '❌ Holochain: Not connected'}
        </div>
        <div>
          <Link
            to="/"
            className="f5 f4-ns bg-black-70 ba br--left dib ph4 pv3 br3 mt2 white dim pointer"
          >
            Start
          </Link>
          <Link
            to="/products"
            className="f5 f4-ns bg-black-70 ba dib ph4 pv3 mt2 white dim pointer"
          >
            Products
          </Link>
          <Link
            to="/inventory"
            className="f5 f4-ns bg-black-70 ba br--right dib ph4 pv3 br3 mt2 white dim pointer"
          >
            Inventory
          </Link>
        </div>
      </header>
    )
  }
}

export default UserHeader
