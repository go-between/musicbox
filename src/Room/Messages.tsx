import React, { useContext, useEffect, useState } from 'react'
import Gravatar from 'react-gravatar'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import { Box, Flex, Text } from 'rebass'

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
    const withSong = message.roomPlaylistRecord && <i> during {message.roomPlaylistRecord.song.name}</i>
    const displayDate = moment(message.createdAt).format('ddd h:mm a')

    return (
      <Box
        key={message.id}
        sx={{
          pb: 3,
        }}
      >
        <Flex alignItems="top">
          <Box
            sx={{
              minWidth: 'auto',
            }}
          >
            <Gravatar email={message.user.email} size={32} style={{ borderRadius: '100%' }} />
          </Box>

          <Box
            sx={{
              hyphens: 'auto',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              wordWrap: 'break-word',
            }}
            mx={2}
          >
            <Text
              sx={{
                fontSize: 2,
                fontWeight: '800',
                pb: 0,
              }}
            >
              <Box as="span" color="text">
                {message.user.name}
              </Box>
              {withSong}
              <Box as="span" color="#A0AEC0" fontSize={1} px={2}>
                {displayDate}
              </Box>
            </Text>

            <Text fontSize={2}>{message.message}</Text>
          </Box>
        </Flex>
      </Box>
    )
  })

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
