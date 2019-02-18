import React from 'react'
import style from './index.module.css'
import { EventHeader } from '../EventHeader'
import { UserList } from '../UserList'
import { MessageList } from '../MessageList'
import { CreateMessageForm } from '../CreateMessageForm'

const Icon = id => (
  id === 'lock' ? <svg id="lock" viewBox="0 0 24 24">
  <path d="M0 0h24v24H0z" fill="none"/>
  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
</svg> : <svg id="public" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
)

export const EventList = ({
  state,
  events = [],
  user,
  users,
  messages,
  current,
  actions
}) => (
    <ul className={style.component}>
      {events.map(event => {
        const attendingCurrent = current.users ? current.users.find(x => x === user.id) : false

        let renderResult = []

        // a little preview of the event
        // click to expand
        if (event.id !== current.id) {
          renderResult.push(<li
            key={event.id}
            disabled={event.id === current.id}
            onClick={e => actions.setEvent(event)}
          >
            {Icon(event.isPrivate ? 'lock' : 'public')}
            <col->
              <p>{event.name.replace(user.id, '')}</p>
              <span>{event.description}</span>
            </col->
          </li>)
        }

        // the expanded view of the selected event
        if (event.id === current.id) {
          renderResult.push(<li key={'openHeader' + event.id} className={style.openEvent}>
            <EventHeader state={state} actions={actions} />
          </li>)
          renderResult.push(<li key={'openPanel' + event.id} className={style.openEvent}>
            <col->
              <h3>Description</h3>
              <h5>{event.description}</h5>
              {attendingCurrent && <MessageList
                user={user}
                users={users}
                messages={messages[event.id]}
              />}
              {attendingCurrent &&
                <CreateMessageForm eventId={current ? current.id : false} actions={actions} />}
            </col->
            <col->
              <UserList
                event={current}
                current={user.id}
                users={users}
              />
            </col->
          </li>)
        }
        return renderResult
      })}
    </ul>
  )
