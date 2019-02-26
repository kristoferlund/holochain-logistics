import { Link } from 'react-router-dom'
import React from 'react'

import { H, P, RouterLink } from '../styles/styledHtml'

const ScreensIndex = () => {
  return (
    <div className="title">
      <H.h1>Hologistics.</H.h1>

      <P.std>
        <RouterLink.std to="/products">Products</RouterLink.std> – Manage the
        global product list, common for all user profiles.
      </P.std>

      <P.std>
        <RouterLink.std to="/inventory">Inventory</RouterLink.std> – Manage the
        inventory linked to your profile.
      </P.std>

      <P.std>
        <RouterLink.std to="/orders">Orders</RouterLink.std> – Browse other
        users inventory, place orders, sign to send and receive.
        <b>[NOT IMPLEMENTED YET]</b>
      </P.std>
    </div>
  )
}

export default ScreensIndex
