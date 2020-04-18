import React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Box, Flex, Text } from 'rebass'
import moment from 'moment'
import { useToasts } from 'react-toast-notifications'
import { Plus } from 'react-feather'

import { useUserContext } from 'Context'

import { ROOM_HISTORY_QUERY, SONG_CREATE, RoomHistoryQuery, SongCreateMutation } from './graphql'
import { MediaObject } from 'components'

const recordsFrom = moment()
  .subtract(2, 'days')
  .toISOString()

const RoomHistory: React.FC = () => {
  const user = useUserContext()
  const { data, loading } = useQuery<RoomHistoryQuery['data'], RoomHistoryQuery['vars']>(ROOM_HISTORY_QUERY, {
    variables: { roomId: user.activeRoom.id, from: recordsFrom },
    fetchPolicy: 'no-cache',
  })

  const { addToast } = useToasts()
  const [createSong] = useMutation<SongCreateMutation['data'], SongCreateMutation['vars']>(SONG_CREATE, {
    onCompleted: ({ songCreate: { song } }) => {
      addToast(`Successfully added ${song.name} to your library`, { appearance: 'success', autoDismiss: true })
    },
  })

  if (loading || !data) {
    return <p>Loading...</p>
  }

  const records = data.roomPlaylist.map(record => {
    const playDate = moment(record.playedAt)
    const addSong = (): void => {
      createSong({ variables: { youtubeId: record.song.youtubeId } })
    }

    return (
      <Box
        as="li"
        key={record.id}
        sx={{
          borderBottom: '1px solid',
          borderColor: 'accent',
          listStyle: 'none',
          mx: 0,
          my: 3,
          pb: 3,
          width: '100%',
        }}
      >
        <MediaObject imageUrl={record.song.thumbnailUrl} alignment="center">
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                color: 'gray500',
                display: 'inline-block',
                fontSize: 1,
                fontWeight: 300,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%',
              }}
            >
              On {playDate.format('MMMM Do YYYY, h:mm:ss a')}, {record.user.name} played
            </Box>

            <Box
              sx={{
                display: 'inline-block',
                fontSize: 1,
                fontWeight: 600,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%',
              }}
            >
              {record.song.name}
            </Box>

            {record.recordListens.map(l => {
              return (
                <Text key={l.id} mr={1} color="gray500" fontSize={1}>
                  {l.user.name}: {l.approval}
                </Text>
              )
            })}
          </Box>

          <Flex alignItems="center" mx={3}>
            <Box
              as={Plus}
              onClick={addSong}
              size={24}
              sx={{
                color: 'text',
                cursor: 'pointer',
                '&:hover': {
                  bg: 'muted',
                  borderRadius: 4,
                },
              }}
            />
          </Flex>
        </MediaObject>
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
