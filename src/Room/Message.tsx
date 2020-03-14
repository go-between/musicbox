import React, { useState } from 'react'
import moment from 'moment'
import Gravatar from 'react-gravatar'
import { MessageCircle, Star } from 'react-feather'
import { Box, Flex, Text } from 'rebass'
import { useMutation } from '@apollo/react-hooks'

import { useUserContext } from 'Context'

import { MESSAGE_PIN, MessagePin, Message as MessageType } from './graphql'

const Message: React.FC<{ message: MessageType }> = ({ message }) => {
  const [pinned, setPinned] = useState(message.pinned)
  const withSong = message.song && `${message.song.name}`
  const displayDate = moment(message.createdAt).format('ddd h:mm a')
  const [messagePin] = useMutation<MessagePin['data'], MessagePin['vars']>(MESSAGE_PIN, {
    onCompleted: () => setPinned(!pinned),
  })

  const pinOrUnpin = (): void => {
    messagePin({ variables: { messageId: message.id, pin: !pinned } })
  }

  const user = useUserContext()
  const pinButton =
    user.id !== message.user.id || !message.song ? (
      ''
    ) : (
      <Box
        onClick={pinOrUnpin}
        sx={{
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: 1,
          p: 2,
          '&:hover': {
            bg: 'accent',
          },
        }}
      >
        {pinned ? <Star size={16} /> : <Star size={16} color="#5A67D8" fill="#5A67D8" />}
        {/* {pinned ? 'unpin' : 'pin' } */}
      </Box>
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
            mx: 2,
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            wordWrap: 'break-word',
            width: '100%',
          }}
        >
          <Text
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              display: 'flex',
              fontSize: 2,
              mb: 2,
            }}
          >
            <Box>
              <Box as="span" sx={{ color: 'text', fontWeight: '800' }}>
                {message.user.name}
              </Box>

              <Box as="span" sx={{ color: '#A0AEC0', fontSize: 1, fontWeight: '600', px: 2 }}>
                {displayDate}
              </Box>
            </Box>

            <Box>{pinButton}</Box>
          </Text>

          <Text fontSize={2} mb={2}>
            {message.message}
          </Text>

          <Box sx={{ alignItems: 'center', color: '#A0AEC0', display: 'flex', fontSize: 2, fontWeight: '400', mb: 2 }}>
            {withSong ? <MessageCircle size={16} /> : <></>}
            <Box mx={1}>{withSong}</Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default Message
