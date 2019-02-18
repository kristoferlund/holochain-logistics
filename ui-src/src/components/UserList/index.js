import React from 'react'
import style from './index.module.css'

export const UserList = ({ event, current, users }) => (
  <ul className={style.component}>
    <h2>Attendees</h2>
    {event.users.map(user => (
      <li
        key={user}
      >
        <img src={users[user] ? users[user].avatar_url : ''} alt='' />
        <p>{users[user] ? users[user].name : '?'}</p>
        <h5>&nbsp;| {user && `@${user.substring(0, 15)}`}</h5>
      </li>
    ))}
  </ul>
)
