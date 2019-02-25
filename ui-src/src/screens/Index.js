import { Link } from 'react-router-dom'
import React from 'react'

const ScreensIndex = () => {
  return (
    <div className="title">
      <h1 className="f1 lh-copy">Hologistics 4001.</h1>

      <p className="f5 f4-ns measure lh-copy">
        <Link to="/products">Products</Link> – Manage the global product list,
        common for all user profiles{' '}
      </p>

      <p className="f5 f4-ns measure lh-copy">
        <Link to="/inventory">Inventory</Link> – Manage the inventory linked to
        your profile <b>[not ready]</b>
      </p>

      <p className="f5 f4-ns measure lh-copy">
        <Link to="/orders">Orders</Link> – Browse other users inventory, place
        orders, sign to send and receive <b>[not ready]</b>
      </p>
    </div>
  )
}

export default ScreensIndex
