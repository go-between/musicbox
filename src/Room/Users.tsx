import React, { useEffect, useState } from 'react'
import Gravatar from 'react-gravatar'
import { useLazyQuery } from '@apollo/react-hooks'
import { Box, Heading, Flex, Text } from 'rebass'

import { useWebsocketContext } from 'Context'

import Approval from './Approval'
import { useCurrentRecordContext } from './CurrentRecordContextProvider'
import { User, RecordListen, RecordListensQuery, RECORD_LISTENS } from './graphql'

type Props = {
  initialUsers: User[]
}
type UserWithApproval = User & { approval: string | number }
const Users: React.FC<Props> = ({ initialUsers }) => {
  const [users, setUsers] = useState<User[]>([])
  const [recordListens, setRecordListens] = useState<RecordListen[]>([])
  const [usersWithApproval, setUsersWithApproval] = useState<UserWithApproval[]>([])
  const websocket = useWebsocketContext()
  const { currentRecord } = useCurrentRecordContext()
  const [loadRecordListens] = useLazyQuery<RecordListensQuery['data'], RecordListensQuery['vars']>(RECORD_LISTENS, {
    fetchPolicy: 'network-only',
    onCompleted: data => setRecordListens(data.recordListens),
  })

  useEffect(() => {
    if (!currentRecord) {
      setRecordListens([])
      return
    }

    loadRecordListens({ variables: { recordId: currentRecord.id } })
  }, [currentRecord, loadRecordListens])

  useEffect(() => {
    return websocket.subscribeToUsers(room => {
      setUsers(room.users)
    })
  }, [websocket])

  useEffect(() => {
    setUsers(initialUsers)
  }, [initialUsers])

  useEffect(() => {
    return websocket.subscribeToRecordListens(recordListens => {
      setRecordListens(recordListens)
    })
  }, [websocket])

  useEffect(() => {
    const newUsersWithApproval = users.map(u => {
      const approval = recordListens.find(listen => listen.user.id === u.id)?.approval
      return {
        ...u,
        approval: approval !== undefined ? approval : '-',
      }
    })

    setUsersWithApproval(newUsersWithApproval)
  }, [recordListens, users])

  return (
    <Box
      sx={{
        borderBottom: '3px solid',
        borderColor: 'accent',
        mb: 4,
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

      <Flex justifyContent="space-between" alignItems="center">
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
            width: 'auto',
          }}
        >
          {usersWithApproval.map(u => (
            <Box
              as="li"
              key={u.id}
              sx={{
                display: 'inline-flex',
                '&:not(:last-child)': {
                  mr: 2,
                },
                alignItems: 'center',
              }}
            >
              <Gravatar email={u.email} size={32} style={{ borderRadius: '100%' }} />
              <Text pl={2} fontSize={7}>
                {u.approval}
              </Text>
            </Box>
          ))}
        </Box>

        <Approval currentRecord={currentRecord} recordListens={recordListens} />
      </Flex>
    </Box>
  )
}

export default Users
