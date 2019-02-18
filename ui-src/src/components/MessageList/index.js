import React from 'react'
import style from './index.module.css'
import { Message } from '../Message'

const emptyList = (
  <div className={style.empty}>
    <div role='img' aria-label='post'>
      📝
    </div>
    <p>Be the first to post in this event!</p>
  </div>
)

export const MessageList = ({ messages = {}, user, users, createConvo }) => (
  <ul id='messages' className={style.component}>
    {Object.keys(messages).length > 0 ? (
      <wrapper->
        {Object.keys(messages)
          .reverse()
          .map(k => Message({ user, createConvo, users })(messages[k]))}
      </wrapper->
    ) : (
      emptyList
    )}
  </ul>
)
