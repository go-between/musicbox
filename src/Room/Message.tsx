import React, { useState } from 'react'
import moment, { Moment } from 'moment'
import Gravatar from 'react-gravatar'
import { Star } from 'react-feather'
import { Box, Flex, Text } from 'rebass'
import { useMutation } from '@apollo/react-hooks'

import { useUserContext } from 'Context'

import { MESSAGE_PIN, MessagePin, Message as MessageType } from './graphql'

type PinProps = {
  showPin: boolean
  previouslyPinned: boolean
  messageId: string
}
const Pin: React.FC<PinProps> = ({ showPin, previouslyPinned, messageId }) => {
  const [pinned, setPinned] = useState(previouslyPinned)

  const [messagePin] = useMutation<MessagePin['data'], MessagePin['vars']>(MESSAGE_PIN, {
    onCompleted: () => setPinned(!pinned),
  })

  const pinOrUnpin = (): void => {
    messagePin({ variables: { messageId, pin: !pinned } })
  }

  if (!showPin) {
    return <></>
  }

  return (
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
}

type PlayedAtProps = {
  messageCreated: Moment
  playedAt?: Moment | ''
  song: MessageType['song']
}
const PlayedAt: React.FC<PlayedAtProps> = ({ messageCreated, playedAt, song }) => {
  if (!song || !playedAt) {
    return <></>
  }

  const saidAt = moment.duration(messageCreated.diff(playedAt))

  return (
    <Box
      as="span"
      sx={{ color: 'gray500', cursor: 'pointer', fontSize: 1, fontWeight: '600', textDecoration: 'underline' }}
    >
      @{' '}
      {saidAt
        .minutes()
        .toString()
        .padStart(2, '0')}
      :
      {saidAt
        .seconds()
        .toString()
        .padStart(2, '0')}
    </Box>
  )
}

const MessageHeader: React.FC<{ message: MessageType }> = ({ message }) => {
  const createdAt = moment(message.createdAt)
  const playedAt = message.roomPlaylistRecord?.playedAt && moment(message.roomPlaylistRecord?.playedAt)
  const user = useUserContext()
  const showPin = user.id === message.user.id && !!message.song

  return (
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
            {createdAt.format('ddd h:mm a')}
          </Box>

          <PlayedAt messageCreated={createdAt} playedAt={playedAt} song={message.song} />
        </Box>
      </Text>

      <Pin messageId={message.id} previouslyPinned={message.pinned} showPin={showPin} />
    </Flex>
  )
}

const Message: React.FC<{ message: MessageType }> = ({ message }) => {
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
          <MessageHeader message={message} />
          <Text fontSize={2} mb={2} sx={{ whiteSpace: 'pre-line' }}>
            {message.message}
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default Message
