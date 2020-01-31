import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import { Box, Flex, Text } from 'rebass'
import { User } from 'react-feather'

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

    const newMessages = [...messages, newMessage].sort((prev, next) => (prev.createdAt > next.createdAt ? 1 : 0))
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
      <Box
        key={message.id}
        sx={{
          pb: 3
        }}
      >
        <Flex
          alignItems="top"
        >
          <Box>
            <Box
              sx={{
                alignItems: 'center',
                bg: 'accent',
                borderRadius: '100%',
                display: 'flex',
                fontSize: 2,
                p: 2,
              }}
            >
              <User size={16} />
            </Box>
          </Box>

          <Box mx={2}>
            <Text
              sx={{
                fontSize: 2,
                fontWeight: '800',
                pb: 1,
              }}
            >
              {message.user.name}
              {/* {withSong} */}
              <Box
                as="span"
                color="#CBD5E0"
                fontSize={1}
                px={2}
              >
                {displayDate}
              </Box>
            </Text>

            <Text
              fontSize={2}
            >
              {message.message}
            </Text>
          </Box>
        </Flex>
      </Box>
    )
  })

  return (
    <Box>
      {messageLines}
    </Box>
  )
}

export default Messages
