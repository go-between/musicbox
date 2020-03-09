import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Box, Text } from 'rebass'

import { WebsocketContext } from 'Router'

import { ROOM_PLAYLIST_QUERY, RoomPlaylistQuery, RoomPlaylistRecord } from './graphql'

type Props = {
  roomId: string
}

const RoomPlaylist: React.FC<Props> = ({ roomId }) => {
  const [playlistRecords, setPlaylistRecords] = useState<RoomPlaylistRecord[]>([])

  const { data, loading } = useQuery<RoomPlaylistQuery['data'], RoomPlaylistQuery['vars']>(ROOM_PLAYLIST_QUERY, {
    variables: { roomId },
  })

  useEffect(() => {
    if (data) {
      setPlaylistRecords(data.roomPlaylist)
    }
  }, [data])

  const websocket = useContext(WebsocketContext)

  useEffect(() => {
    return websocket.subscribeToRoomPlaylist(roomPlaylist => {
      setPlaylistRecords(roomPlaylist)
    })
  }, [websocket])

  if (loading) {
    return <p>Loading...</p>
  }

  const records = playlistRecords.map(record => {
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
            {record.user.name}
          </Text>

          <Text
            sx={{
              fontSize: 2,
              fontWeight: '800',
              pb: 1,
            }}
          >
            {record.song.name}
          </Text>
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

export default RoomPlaylist
