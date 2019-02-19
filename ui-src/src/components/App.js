import { Link } from 'react-router-dom'
import React from 'react'

export const Title = () => {
  return (
    <div className='title'>
      <h1>Holochain Logistics</h1>
      <Link to='/products'><button>Product list</button></Link>
      <Link to='/old'><button>Old events page</button></Link>
    </div>
  )
}
