import './styles/tachyons.min.css'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import React from 'reactn'
import ScreensRegister from './screens/Register'
import ScreensIndex from './screens/Index'
import ScreensInventory from './screens/Inventory'
import ScreensProduct from './screens/Product'
import ScreensProductList from './screens/ProductList'
import UserHeader from './components/UserHeader'

import { hcGetUserProfile } from './holochain/profile'
import { hcConnect } from './holochain'

export default class App extends React.Component {
  async startupHolochain() {
    await hcConnect()
    const profile = await hcGetUserProfile()
    if (profile) {
      this.setGlobal({
        user: {
          registered: true,
          id: profile.address,
          name: profile.name,
          avatarURL: profile.avatar_url,
          description: profile.description
        }
      })
    } else {
      this.setGlobal({
        user: {
          registered: false
        }
      })
    }
  }

  componentDidMount() {
    this.startupHolochain()
  }

  awaitConnection() {
    return 'LOADING...'
  }

  loadApp() {
    return (
      <BrowserRouter>
        <div className="w-100 sans-serif">
          <UserHeader />
          <div className="w-100 sans-serif ph3 ph5-ns bg-white black-70">
            <Switch>
              <Route exact path="/" component={ScreensIndex} />
              <Route path="/products" component={ScreensProductList} />
              <Route path="/product" component={ScreensProduct} />
              <Route path="/register" component={ScreensRegister} />
              <Route path="/inventory" component={ScreensInventory} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }

  render() {
    const { hc } = this.global
    return !hc.connected ? this.awaitConnection() : this.loadApp()
  }
}
