import React, { useContext, useEffect, useState } from 'react'
import { Box, Text } from 'rebass'

import { WebsocketContext } from 'Router'
import { User } from './graphql'

type Props = {
  initialUsers: User[]
}
const Users: React.FC<Props> = ({ initialUsers }) => {
  const [users, setUsers] = useState<User[]>([])

  const websocket = useContext(WebsocketContext)

  useEffect(() => {
    return websocket.subscribeToUsers(room => {
      setUsers(room.users)
    })
  }, [websocket])

  useEffect(() => {
    setUsers(initialUsers)
  }, [initialUsers])

  return (
    <Box
      as="ul"
      sx={{
        listStyle: 'none',
        m: 0,
        p: 0,
      }}
    >
      {users.map(u => (
        <Box as="li" key={u.id}>
          <Text
            sx={{
              fontWeight: '400',
            }}
          >
            {u.name}-{u.email}
          </Text>
          {/* ({u.id}) */}
        </Box>
      ))}
    </Box>
  )
}

export default Users
