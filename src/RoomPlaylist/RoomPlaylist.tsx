import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useQuery } from '@apollo/react-hooks'
import { Box, Flex, Text } from 'rebass'

import { useUserContext, useWebsocketContext } from 'Context'

import { ROOM_PLAYLIST_QUERY, RoomPlaylistQuery, RoomPlaylistRecord } from './graphql'
import { duration } from 'lib/formatters'
import { MediaObject } from 'components'

const RoomPlaylist: React.FC = () => {
  const user = useUserContext()
  const [playlistRecords, setPlaylistRecords] = useState<RoomPlaylistRecord[]>([])

  const { data, loading } = useQuery<RoomPlaylistQuery['data'], RoomPlaylistQuery['vars']>(ROOM_PLAYLIST_QUERY, {
    variables: { roomId: user.activeRoom.id },
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (data) {
      setPlaylistRecords(data.roomPlaylist)
    }
  }, [data])

  const websocket = useWebsocketContext()

  useEffect(() => {
    return websocket.subscribeToRoomPlaylist(roomPlaylist => {
      setPlaylistRecords(roomPlaylist)
    })
  }, [websocket])

  if (loading) {
    return <p>Loading...</p>
  }

  const records = playlistRecords.map(record => {
    const songDuration = moment.duration(record.song.durationInSeconds, 'seconds')

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
            <Text
              sx={{
                color: 'gray500',
                fontSize: 1,
                fontWeight: 300,
              }}
            >
              {record.user.name}
            </Text>

            {record.song.name}
          </Box>

          <Flex alignItems="center">
            <Box
              sx={{
                color: 'gray400',
                fontSize: 1,
                px: 3,
              }}
            >
              {duration(songDuration)}
            </Box>
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

export default RoomPlaylist
