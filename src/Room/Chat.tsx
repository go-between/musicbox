import React from 'react'
import { Flex } from 'rebass'

import Messages from './Messages'
import MessageEntry from './MessageEntry'
import Users from './Users'
import { Room as RoomType } from './graphql'

const Chat: React.FC<{ room: RoomType }> = ({ room }) => {
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
        p: 4,
        width: ['100%', '40%'],
      }}
    >
      <Users initialUsers={room.users || []} />
      <Messages />
      <MessageEntry />
    </Flex>
  )
}

export default Chat
