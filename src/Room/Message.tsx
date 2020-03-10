import React, { useState } from 'react'
import moment from 'moment'
import Gravatar from 'react-gravatar'
import { Button, Box, Flex, Text } from 'rebass'
import { useMutation } from '@apollo/react-hooks'

import { useUserContext } from 'Context'

import { MESSAGE_PIN, MessagePin, Message as MessageType } from './graphql'

const Message: React.FC<{ message: MessageType }> = ({ message }) => {
  const [pinned, setPinned] = useState(message.pinned)
  const withSong = message.song && <i> during {message.song.name}</i>
  const displayDate = moment(message.createdAt).format('ddd h:mm a')
  const [messagePin] = useMutation<MessagePin['data'], MessagePin['vars']>(MESSAGE_PIN, {
    onCompleted: () => setPinned(!pinned),
  })

  const pinOrUnpin = (): void => {
    messagePin({ variables: { messageId: message.id, pin: !pinned } })
  }

  const user = useUserContext()
  const pinButton = user.id !== message.user.id ? '' : (
    <Button sx={{ fontSize: 1 }} onClick={pinOrUnpin}>
      {pinned ? 'unpin' : 'pin'}
    </Button>
  )

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
            {pinButton}
          </Text>

          <Text fontSize={2}>{message.message}</Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default Message
