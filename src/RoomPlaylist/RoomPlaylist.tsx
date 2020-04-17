import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useQuery } from '@apollo/react-hooks'
import { Box, Flex, Image, Text } from 'rebass'
import { Image as ImageIcon } from 'react-feather'

import { useUserContext, useWebsocketContext } from 'Context'

import { ROOM_PLAYLIST_QUERY, RoomPlaylistQuery, RoomPlaylistRecord } from './graphql'
import { duration } from 'lib/formatters'

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

    const renderThumbnail = (thumbnailUrl: string) => {
      if (!thumbnailUrl) {
        return(
          <Flex
            sx={{
              alignItems: 'center',
              border: '1px solid',
              borderColor: 'accent',
              borderRadius: 3,
              boxShadow: 'xl',
              height: '100%',
              justifyContent: 'center',
              p: 2,
              width: '50px'
            }}
          >
           <Box as={ImageIcon} size={20} color="muted" />
          </Flex>
        )
      }
      return (
        <Image
            src={thumbnailUrl}
            sx={{
              borderRadius: 3,
              boxShadow: 'xl',
              height: '100%',
              width: '100%'
            }}
        />
      )
    }

    return (
      <Box
        as="li"
        key={record.id}
        sx={{
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'accent',
          display: 'flex',
          listStyle: 'none',
          mx: 0,
          my: 3,
          pb: 3,
          width: '100%'
        }}
      >
        <Box
          sx={{
            width: '50px',
          }}
        >
          {renderThumbnail(record.song.thumbnailUrl)}
        </Box>

        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            mx: 3,
            width: '100%'
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
