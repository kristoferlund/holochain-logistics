import { Link } from 'react-router-dom'
import React from 'react'

export const Title = () => {
  return (
    <div className='title'>
      <h1 className='f1 lh-copy'>Holochain Logistics (4000?)</h1>

      <p className='f5 f4-ns measure lh-copy'><Link to='/products'>Products</Link> – Manage the global product list, common for all profiles </p>

      <p className='f5 f4-ns measure lh-copy'><Link to='/inventory'>Inventory</Link> – Manage the inventory linked to your profile [not done]</p>

      <p className='f5 f4-ns measure lh-copy'><Link to='/orders'>Orders</Link> – Browse other users inventory, place orders, sign to send and receive  [not done]</p>

    </div>
  )
}
