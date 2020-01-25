import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'

import { WebsocketContext } from 'App'

import { MESSAGES_QUERY, MessagesQuery, Message } from './graphql'

const Messages: React.FC = () => {
  const { data, loading } = useQuery<MessagesQuery['data'], MessagesQuery['vars']>(MESSAGES_QUERY)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState<Message | null>(null)

  useEffect(() => {
    if (!data) {
      return
    }

    setMessages(data.messages)
  }, [data])

  useEffect(() => {
    if (!newMessage) {
      return
    }

    const newMessages = [...messages, newMessage].sort((prev, next) => (prev.createdAt > next.createdAt ? 0 : 1))
    setMessages(newMessages)
    setNewMessage(null)
  }, [messages, newMessage])

  const websocket = useContext(WebsocketContext)
  useEffect(() => {
    if (!websocket) {
      return
    }

    return websocket.subscribeToMessage(message => {
      setNewMessage(message)
    })
  }, [websocket])

  if (loading) {
    return <p>Loading...</p>
  }

  const messageLines = messages.map(message => {
    const withSong = message.roomPlaylistRecord && <i>during {message.roomPlaylistRecord.song.name}</i>
    const displayDate = moment(message.createdAt).format('ddd h:mm a')
    return (
      <div key={message.id}>
        <p>
          <strong>
            {message.user.name} said {withSong} at {displayDate}
          </strong>
        </p>
        <p>{message.message}</p>
      </div>
    )
  })

  return (
    <>
      <p>Chat History</p>
      {messageLines}
    </>
  )
}

export default Messages
