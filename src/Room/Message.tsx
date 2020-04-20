import React, { useState } from 'react'
import moment, { Moment } from 'moment'
import Gravatar from 'react-gravatar'
import { Star } from 'react-feather'
import { Box, Flex, Text } from 'rebass'
import { useMutation } from '@apollo/react-hooks'

import { useUserContext } from 'Context'
import { duration } from 'lib/formatters'

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
        borderRadius: 4,
        cursor: 'pointer',
        fontSize: 1,
        p: 2,
        '&:hover': {
          bg: 'accent',
        },
      }}
    >
      {pinned ? <Star size={16} color="#5A67D8" fill="#5A67D8" /> : <Star size={16} />}
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

  const saidAt = messageCreated.diff(playedAt, 'seconds')

  return (
    <Box
      sx={{
        color: 'gray500',
        cursor: 'pointer',
        fontSize: 1,
        fontWeight: '600',
        position: 'relative',
        '&:hover > *': {
          visibility: 'visible',
        },
      }}
    >
      @{' '}
      <Box as="span" sx={{ textDecoration: 'underline' }}>
        {duration(saidAt)}
      </Box>
      <Box
        sx={{
          bg: 'black',
          borderRadius: 6,
          border: '1px solid',
          borderColor: 'gray700',
          boxShadow: 'xxl',
          bottom: '150%',
          fontSize: 0,
          left: '50%',
          ml: '-100px',
          p: 2,
          position: 'absolute',
          textAlign: 'center',
          visibility: 'hidden',
          width: '250px',
          zIndex: 100,
        }}
      >
        {song.name}
      </Box>
    </Box>
  )
}

const MessageHeader: React.FC<{ message: MessageType }> = ({ message }) => {
  const createdAt = moment(message.createdAt)
  const playedAt = message.roomPlaylistRecord?.playedAt && moment(message.roomPlaylistRecord?.playedAt)
  const user = useUserContext()
  const showPin = user.id === message.user.id && !!message.song

  return (
    <>
      <Box
        className="message-options"
        sx={{
          alignItems: 'center',
          border: '1px solid',
          borderColor: 'accent',
          bg: 'background',
          borderRadius: 6,
          boxShadow: 'xxl',
          display: 'none',
          justifyContent: 'space-between',
          position: 'absolute',
          top: -3,
          right: 4,
        }}
      >
        <Pin messageId={message.id} previouslyPinned={message.pinned} showPin={showPin} />
      </Box>

      <Flex
        alignItems="flex-start"
        justifyContent="space-between"
        sx={{
          position: 'relative',
          overflow: 'visible',
        }}
      >
        <Text
          sx={{
            alignItems: 'center',
            display: 'flex',
            fontSize: 2,
            mb: 1,
            overflow: 'visible',
            width: '100%',
          }}
        >
          <Box sx={{ color: 'text', fontWeight: '800' }}>{message.user.name}</Box>

          <Box sx={{ color: 'gray500', fontSize: 1, fontWeight: '600', px: 2 }}>{createdAt.format('ddd h:mm a')}</Box>
          <PlayedAt messageCreated={createdAt} playedAt={playedAt} song={message.song} />
        </Text>
      </Flex>
    </>
  )
}

const PinnedMessage: React.FC<{ pinned: boolean }> = ({ pinned }) => {
  if (!pinned) {
    return <></>
  }
  return (
    <Flex
      sx={{
        alignItems: 'center',
        m: 2,
      }}
    >
      <Star size={14} color="#5A67D8" fill="#5A67D8" />
      <Text fontSize={1} mx={1}>
        Pinned!
      </Text>
    </Flex>
  )
}

const Message: React.FC<{ message: MessageType }> = ({ message }) => {
  return (
    <>
      <Box
        key={message.id}
        sx={{
          bg: message.pinned ? 'highlight' : 'inherit',
          position: 'relative',
          px: 4,
          py: 3,
          '&:hover': {
            bg: message.pinned ? 'highlight' : 'accentHover',
          },
          '&:hover .message-options': {
            display: 'flex',
          },
        }}
      >
        <PinnedMessage pinned={message.pinned} />
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
              width: '100%',
            }}
          >
            <MessageHeader message={message} />
            <Text
              fontSize={2}
              sx={{
                whiteSpace: 'pre-line',
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
                wordWrap: 'break-word',
              }}
            >
              {message.message}
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default Message
