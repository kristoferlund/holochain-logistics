import './styles/tachyons.min.css'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ProductListScreen from './components/ProductListScreen'
import ProductScreen from './components/ProductScreen'
import React from 'react'
import ReactDOM from 'react-dom'
import RegisterScreen from './components/RegisterScreen'
import { Title } from './components/App'
import UserHeader from './components/UserHeader'

ReactDOM.render(
  <BrowserRouter>
    <div className='w-100 sans-serif'>
      <UserHeader />
      <div className='w-100 sans-serif pv4 ph3 ph5-ns bg-white black-70'>
        <Switch>
          <Route exact path='/' component={Title} />
          <Route path='/products' component={ProductListScreen} />
          <Route path='/product' component={ProductScreen} />
          <Route path='/register' component={RegisterScreen} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
  , document.getElementById('root')
)
