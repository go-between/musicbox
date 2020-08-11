import React, { useState } from 'react'
import { Box, Flex, Heading } from 'rebass'

import Messages from './Messages'
import MessageEntry from './MessageEntry'
import PinnedMessages from './PinnedMessages'
import { usePinnedMessagesContext } from './PinnedMessagesContextProvider'

const Chat: React.FC = () => {
  const [tab, setTab] = useState<'chat' | 'pinned'>('chat')
  const selectChat = (): void => setTab('chat')
  const selectPinned = (): void => setTab('pinned')
  const { pinnedMessages } = usePinnedMessagesContext()

  return (
    <Flex
      as="aside"
      sx={{
        color: 'text',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        overflow: 'scroll',
        py: 4,
        px: [3, 0],
        width: ['100%', '100%', '40%'],
      }}
    >
      {/* <Flex
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
          <Heading>Pinned ({pinnedMessages.length})</Heading>
        </Box>
      </Flex> */}
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
