import React, { createRef, useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import { Box } from 'rebass'

import { useWebsocketContext } from 'Context'

import { MESSAGES_QUERY, MessagesQuery, Message as MessageType } from './graphql'
import Message from './Message'

const messagesFrom = moment()
  .subtract(2, 'days')
  .toISOString()
const Messages: React.FC = () => {
  const { data, loading } = useQuery<MessagesQuery['data'], MessagesQuery['vars']>(MESSAGES_QUERY, {
    variables: { from: messagesFrom },
    fetchPolicy: 'network-only',
  })
  const [messages, setMessages] = useState<MessageType[]>([])
  const [newMessage, setNewMessage] = useState<MessageType | null>(null)
  const chat = createRef<HTMLDivElement>()

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

    const newMessages = [...messages, newMessage].sort((prev, next) => (prev.createdAt > next.createdAt ? 1 : 0))
    setMessages(newMessages)
    setNewMessage(null)
  }, [messages, newMessage])

  useEffect(() => {
    if (!chat || !chat.current) {
      return
    }

    chat.current.scrollTop = chat.current.scrollHeight
  }, [chat, messages])

  const websocket = useWebsocketContext()
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
      ref={chat}
      sx={{
        overflowY: 'scroll',
      }}
    >
      {messageLines}
    </Box>
  )
}

export default Messages
