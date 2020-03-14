import React, { useEffect, useState } from 'react'
import Gravatar from 'react-gravatar'
import { Circle } from 'react-feather'
import { Box, Flex, Heading, Text } from 'rebass'

import { useWebsocketContext } from 'Context'
import { User } from './graphql'

type Props = {
  initialUsers: User[]
}
const Users: React.FC<Props> = ({ initialUsers }) => {
  const [users, setUsers] = useState<User[]>([])
  const websocket = useWebsocketContext()

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
      sx={{
        borderBottom: '3px solid',
        borderColor: 'accent',
        mb: 4
      }}
    >
      <Heading
        sx={{
          alignItems: 'center',
          color: 'text',
          display: 'flex',
          fontSize: 2,
          fontWeight: '600',
          m: 0,
        }}
      >
        <Box
          sx={{
            bg: 'green',
            borderRadius: '100%',
            height: '12px',
            mr: 2,
            width: '12px',
          }}
        />
        Active Users
      </Heading>

      <Box
        as="ul"
        sx={{
          boxShadow: 'inner',
          listStyle: 'none',
          my: 0,
          overflowX: 'auto',
          px: 0,
          py: 3,
          whiteSpace: 'nowrap',
          width: 'auto'
        }}
      >
        {users.map(u => (
          <Box
            as="li"
            key={u.id}
            sx={{
              display: 'inline-flex',
              '&:not(:last-child)': {
                mr: 2,
              }
            }}
          >
            <Gravatar email={u.email} size={32} style={{ borderRadius: '100%' }} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Users
