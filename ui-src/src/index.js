import { BrowserRouter, Route } from 'react-router-dom'

import OldStartScreen from './components/OldStartScreen'
import ProductScreen from './components/ProductScreen'
import React from 'react'
import ReactDOM from 'react-dom'
import { Title } from './components/App'

import './styles/tachyons.min.css'

ReactDOM.render(
  <BrowserRouter>
    <div className='w-100 sans-serif pv4 ph3 ph5-ns bg-white black-70'>
      <Route exact path='/' component={Title} />
      <Route path='/products' component={ProductScreen} />
      <Route path='/old' component={OldStartScreen} />
    </div>
  </BrowserRouter>
  , document.getElementById('root')
)
