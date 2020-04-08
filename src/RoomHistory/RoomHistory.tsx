import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Box, Flex, Text } from 'rebass'
import moment from 'moment'

import { useUserContext } from 'Context'

import { ROOM_HISTORY_QUERY, RoomHistoryQuery } from './graphql'

const recordsFrom = moment()
  .subtract(2, 'days')
  .toISOString()

const RoomHistory: React.FC = () => {
  const user = useUserContext()
  const { data, loading } = useQuery<RoomHistoryQuery['data'], RoomHistoryQuery['vars']>(ROOM_HISTORY_QUERY, {
    variables: { roomId: user.activeRoom.id, from: recordsFrom },
    fetchPolicy: 'no-cache',
  })

  if (loading || !data) {
    return <p>Loading...</p>
  }

  const records = data.roomPlaylist.map(record => {
    const playDate = moment(record.playedAt)
    return (
      <Box
        as="li"
        key={record.id}
        sx={{
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'muted',
          display: 'flex',
          justifyContent: 'space-between',
          listStyle: 'none',
          mx: 0,
          my: 3,
          pb: 3,
        }}
      >
        <Box
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mr: 2,
          }}
        >
          <Text
            sx={{
              color: 'gray300',
              fontSize: 1,
            }}
          >
            On {playDate.format('MMMM Do YYYY, h:mm:ss a')}, {record.user.name} played
          </Text>
          <Text
            sx={{
              color: 'gray300',
              fontSize: 1,
            }}
          >
            {record.song.name}
          </Text>
          <Flex
            sx={{
              color: 'gray300',
              fontSize: 1,
            }}
          >
            {record.recordListens.map(l => {
              return (
                <Text key={l.id} mr={1}>
                  {l.user.name}: {l.approval}
                </Text>
              )
            })}
          </Flex>
        </Box>
      </Box>
    )
  })
  return (
    <Box
      width="100%"
      as="ul"
      sx={{
        m: 0,
        p: 0,
      }}
    >
      {records}
    </Box>
  )
}

export default RoomHistory