import React, { createRef, useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import { Box } from 'rebass'

import { useWebsocketContext } from 'Context'

import { MESSAGES_QUERY, MessagesQuery, Message as MessageType } from './graphql'
import Message from './Message'

type MessageGroup = [string, MessageType[]]
const groupMessagesByRecord = (messages: MessageType[]): MessageGroup[] => {
  const messageGroups: MessageGroup[] = []
  let messageGroup: MessageGroup = ['', []]
  let recordId = ''

  messages.forEach(message => {
    if ((message.roomPlaylistRecord?.id || '') === recordId) {
      messageGroup[1].push(message)
    } else {
      messageGroups.push(messageGroup)
      recordId = message.roomPlaylistRecord?.id || ''
      messageGroup = [recordId, [message]]
    }
  })
  messageGroups.push(messageGroup)

  return messageGroups
}

const MessageGroup: React.FC<{ messageGroup: MessageGroup }> = ({ messageGroup }) => {
  const [recordId, messages] = messageGroup
  const songName = !!recordId && messages[0].song?.name

  return (
    <>
      <Box
        sx={{
          my: 4,
          position: 'relative',
          '&:before': {
            bg: 'accent',
            content: "''",
            height: '1px',
            left: 0,
            position: 'absolute',
            top: '50%',
            width: '25%',
          },
          '&:after': {
            bg: 'accent',
            content: "''",
            height: '1px',
            right: 0,
            position: 'absolute',
            top: '50%',
            width: '25%',
          },
        }}
      >
        <Box
          sx={{
            bg: 'backgroundTint',
            border: '1px solid',
            borderColor: 'accent',
            borderRadius: 6,
            boxShadow: 'md',
            color: 'gray500',
            fontSize: 0,
            fontWeight: 600,
            overflow: 'hidden',
            py: 2,
            px: 3,
            m: '0 auto',
            textAlign: 'center',
            textTransform: 'uppercase',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '50%',
          }}
        >
          {songName || 'No Song Playing'}
        </Box>
      </Box>
      {messages.map(message => (
        <Message key={message.id} message={message} />
      ))}
    </>
  )
}

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

  const groupedMessages = groupMessagesByRecord(messages)

  const messageLines = groupedMessages.map((messageGroup, idx) => (
    <MessageGroup key={idx} messageGroup={messageGroup} />
  ))
  return (
    <Box
      ref={chat}
      sx={{
        overflowY: 'scroll',
        py: 4,
      }}
    >
      {messageLines}
    </Box>
  )
}

export default Messages
