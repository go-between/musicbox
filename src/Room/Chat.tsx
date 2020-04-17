import React, { useState } from 'react'
import { Box, Flex, Heading } from 'rebass'

import Messages from './Messages'
import MessageEntry from './MessageEntry'
import PinnedMessages from './PinnedMessages'

const Chat: React.FC = () => {
  const [tab, setTab] = useState<'chat' | 'pinned'>('chat')
  const selectChat = (): void => setTab('chat')
  const selectPinned = (): void => setTab('pinned')

  return (
    <Flex
      as="aside"
      sx={{
        borderLeft: '1px solid',
        borderColor: 'accent',
        color: 'text',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'space-between',
        overflow: 'scroll',
        py: 4,
        width: ['100%'],
      }}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        sx={{ borderBottom: 'thin solid', borderBottomColor: 'accent' }}
      >
        <Box
          onClick={selectChat}
          sx={{
            textAlign: 'center',
            width: '100%',
            cursor: tab === 'chat' ? 'default' : 'pointer',
            bg: tab === 'chat' ? 'accent' : 'inherit',
            p: 2,
            '&:hover': { bg: 'accent' },
          }}
        >
          <Heading>Chat</Heading>
        </Box>
        <Box
          onClick={selectPinned}
          sx={{
            textAlign: 'center',
            width: '100%',
            cursor: tab === 'pinned' ? 'default' : 'pointer',
            bg: tab === 'pinned' ? 'accent' : 'inherit',
            p: 2,
            '&:hover': { bg: 'accent' },
          }}
        >
          <Heading>Pinned</Heading>
        </Box>
      </Flex>
      {tab === 'chat' ? (
        <>
          <Messages />
          <MessageEntry />
        </>
      ) : (
        <PinnedMessages />
      )}
    </Flex>
  )
}

export default Chat
