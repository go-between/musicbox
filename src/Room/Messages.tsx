import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Box } from 'rebass'

import { WebsocketContext } from 'App'

import { MESSAGES_QUERY, MessagesQuery, Message as MessageType } from './graphql'
import Message from './Message'

const Messages: React.FC = () => {
  const { data, loading } = useQuery<MessagesQuery['data'], MessagesQuery['vars']>(MESSAGES_QUERY)
  const [messages, setMessages] = useState<MessageType[]>([])
  const [newMessage, setNewMessage] = useState<MessageType | null>(null)

  useEffect(() => {
    if (!data) {
      return
    }

    setMessages(data.messages)
    // TODO: this needs to be cleaned up, I'm just duplicating what we're doing below on setMessages
    const chat = document.getElementById('chat')
    setTimeout(() => {
      if (chat) {
        chat.scrollTop = chat.scrollHeight
      }
    }, 100)
  }, [data])

  useEffect(() => {
    if (!newMessage) {
      return
    }

    const newMessages = [...messages, newMessage].sort((prev, next) => (prev.createdAt > next.createdAt ? 1 : 0))
    setMessages(newMessages)
    setNewMessage(null)
    // TODO: revist this and see if there's a more elegant way to do this without using setTimeout
    const chat = document.getElementById('chat')
    setTimeout(() => {
      if (chat) {
        chat.scrollTop = chat.scrollHeight
      }
    }, 100)
  }, [messages, newMessage])

  const websocket = useContext(WebsocketContext)
  useEffect(() => {
    return websocket.subscribeToMessage(message => {
      setNewMessage(message)
    })
  }, [websocket])

  if (loading) {
    return <p>Loading...</p>
  }

  const messageLines = messages.map(message => <Message key={message.id} message={message} />)
  return (
    <Box
      id="chat"
      sx={{
        overflowY: 'scroll',
      }}
    >
      {messageLines}
    </Box>
  )
}

export default Messages
