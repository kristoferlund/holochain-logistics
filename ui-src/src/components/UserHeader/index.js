import React from 'react'
import style from './index.module.css'

const placeholder =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

export const UserHeader = ({ sidebarOpen, user = {}, setSidebar }) => (
  <header className={style.component}>
    <button onClick={e => setSidebar(!sidebarOpen)}>
    <svg id="menu" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>
    </button>
    <img src={user.avatarURL || placeholder} alt='' />
    <div>
      <h3>{user.name}</h3>
      <h5>{user.id && `@${user.id.substring(0, 15)}`}</h5>
    </div>
  </header>
)
