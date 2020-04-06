import React, { createContext, useContext, useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'

import { useWebsocketContext } from 'Context'

import { MESSAGES_QUERY, MessagesQuery, Message } from './graphql'

type MessagesContext = {
  messages: Message[]
}

const messagesFrom = moment()
  .subtract(2, 'days')
  .toISOString()

const MessagesContext = createContext<Partial<MessagesContext>>({})
const MessagesContextProvider: React.FC = ({ children }) => {
  const { data } = useQuery<MessagesQuery['data'], MessagesQuery['vars']>(MESSAGES_QUERY, {
    variables: { from: messagesFrom },
    fetchPolicy: 'network-only',
  })
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

    const newMessages = [...messages, newMessage].sort((prev, next) => (prev.createdAt > next.createdAt ? 1 : 0))
    setMessages(newMessages)
    setNewMessage(null)
  }, [messages, newMessage])

  const websocket = useWebsocketContext()
  useEffect(() => {
    return websocket.subscribeToMessage(message => {
      setNewMessage(message)
    })
  }, [websocket])

  return <MessagesContext.Provider value={{ messages }}>{children}</MessagesContext.Provider>
}

export const useMessagesContext: () => MessagesContext = () => {
  const { messages } = useContext(MessagesContext)

  if (messages === undefined) {
    throw new Error('MessagesContext accessed before being set')
  }

  return { messages }
}
export default MessagesContextProvider
