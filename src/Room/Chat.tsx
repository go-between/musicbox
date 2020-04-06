import React from 'react'
import { Flex } from 'rebass'

import Messages from './Messages'
import MessageEntry from './MessageEntry'

const Chat: React.FC = () => {
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
        width: ['100%', '50%'],
      }}
    >
      <Messages />
      <MessageEntry />
    </Flex>
  )
}

export default Chat
