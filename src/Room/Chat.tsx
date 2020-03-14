import React from 'react'
import { Flex, Heading, Text } from 'rebass'

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
        justifyContent: 'flex-start',
        overflow: 'scroll',
        p: 4,
        width: ['100%', '40%'],
      }}
    >
      <Heading
        sx={{
          fontSize: '3',
          pb: 4,
        }}
      >
        Active Users
        <Text
          sx={{
            color: 'text',
            fontWeight: '400',
            fontSize: 3,
          }}
        >
          <Users initialUsers={room.users || []} />
        </Text>
      </Heading>
      <Messages />
      <MessageEntry />
    </Flex>
  )
}

export default Chat
