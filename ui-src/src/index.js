import React, { addCallback, setGlobal } from 'reactn'
import App from './App'

import ReactDOM from 'react-dom'

setGlobal({
  hc: {},
  user: {},
  inventory: {},
  products: {},
  product: {}
})

addCallback(globalState => {
  console.log('STATE UPDATE')
  console.log(globalState)
  return null
})

ReactDOM.render(<App />, document.getElementById('root'))
