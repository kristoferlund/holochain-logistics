import React from 'react'
import style from './index.module.css'

export const CreateMessageForm = ({
  eventId,
  actions: { sendMessage, runCommand }
}) =>
  eventId ? (
    <form
      className={style.component}
      onSubmit={e => {
        e.preventDefault()

        const message = e.target[0].value.trim()

        if (message.length === 0) {
          return
        }

        e.target[0].value = ''

        message.startsWith('/')
          ? runCommand(message.slice(1))
          : sendMessage({
            text: message,
            eventId
          })
      }}
    >
      <input
        placeholder='Post a message to the event...'
      />
      <button type='submit'>
      <svg id="send" viewBox="0 0 24 24">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
      </button>
    </form>
  ) : null
