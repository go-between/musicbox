import React, { useState } from 'react'
import { Flex } from 'rebass'

import Messages from './Messages'
import MessageEntry from './MessageEntry'
import ChatDetails from './ChatDetails'
import PinnedMessages from './PinnedMessages'

const Chat: React.FC = () => {
  const [tab, setTab] = useState(true)

  return (
    <Flex
      as="aside"
      sx={{
        bg: 'accentHover',
        borderRadius: 6,
        boxShadow: 'xl',
        color: 'text',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        width: ['100%', '100%', '100%', '45%'],
      }}
    >
      <ChatDetails tab={tab} setTab={setTab} />
      {tab ? <Messages /> : <PinnedMessages />}
      <MessageEntry />
    </Flex>
  )
}

export default Chat
