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
  const withSong = message.song && message.song.name
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
        {pinned ? <Star size={18} color="#5A67D8" fill="#5A67D8" /> : <Star size={18} />}
      </Box>
    )

  return (
    <Box
      key={message.id}
      sx={{
        pb: 3,
      }}
    >
      <Flex alignItems="flex-start">
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
          <Flex
            alignItems="flex-start"
            justifyContent="space-between"
            sx={{
              position: 'relative',
            }}
          >
            <Text
              sx={{
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexDirection: 'column',
                display: 'flex',
                fontSize: 2,
                mb: 2,
                overflow: 'hidden',
                width: '100%',
              }}
            >
              <Box mb={1}>
                <Box as="span" sx={{ color: 'text', fontWeight: '800' }}>
                  {message.user.name}
                </Box>

                <Box as="span" sx={{ color: 'gray500', fontSize: 1, fontWeight: '600', px: 2 }}>
                  {displayDate}
                </Box>
              </Box>

              <Box
                sx={{
                  alignItems: 'center',
                  color: 'gray500',
                  display: 'flex',
                  fontSize: 2,
                  fontWeight: '400',
                  minWidth: '0',
                  mb: 2,
                }}
              >
                {withSong ? <MessageCircle size={16} /> : <></>}
                <Box
                  sx={{
                    minWidth: '0',
                    mx: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {withSong}
                </Box>
              </Box>
            </Text>

            <Box>{pinButton}</Box>
          </Flex>

          <Text fontSize={2} mb={2} sx={{ whiteSpace: 'pre-line' }}>
            {message.message}
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default Message
