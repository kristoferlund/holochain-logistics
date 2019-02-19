import { BrowserRouter, Route } from 'react-router-dom'

import OldStartScreen from './components/OldStartScreen'
import ProductScreen from './components/ProductScreen'
import React from 'react'
import ReactDOM from 'react-dom'
import { Title } from './components/App'

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path='/' component={Title} />
      <Route path='/products' component={ProductScreen} />
      <Route path='/old' component={OldStartScreen} />
    </div>
  </BrowserRouter>
  , document.getElementById('root')
)
