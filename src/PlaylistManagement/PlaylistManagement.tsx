import React, { useEffect, useState } from 'react'
import { useMutation, MutationTuple } from '@apollo/react-hooks'
import { Box, Flex, Text } from 'rebass'
import { Inbox, List } from 'react-feather'

import Library from './Library'
import UserPlaylist from './UserPlaylist'

import { ROOM_PLAYLIST_RECORDS_REORDER, RoomPlaylistRecord, RoomPlaylistRecordsReorderMutation } from './graphql'

export type RoomPlaylistRecordsReorder = MutationTuple<
  RoomPlaylistRecordsReorderMutation['data'],
  RoomPlaylistRecordsReorderMutation['vars']
>
const PlaylistManagement: React.FC = () => {
  const [roomPlaylistRecords, setRoomPlaylistRecords] = useState<RoomPlaylistRecord[]>([])
  const [roomPlaylistRecordsReorder, { data }] = useMutation<
    RoomPlaylistRecordsReorderMutation['data'],
    RoomPlaylistRecordsReorderMutation['vars']
  >(ROOM_PLAYLIST_RECORDS_REORDER)

  useEffect(() => {
    if (!data?.roomPlaylistRecordsReorder) {
      return
    }

    setRoomPlaylistRecords(data.roomPlaylistRecordsReorder.roomPlaylistRecords)
  }, [data])

  return (
    <>
      <Box
        sx={{
          flex: '1 0 auto',
          height: '40%',
          overflowY: 'scroll',
          mb: 5,
        }}
      >
        <Flex
          sx={{
            alignItems: 'center',
            pb: 2,
          }}
        >
          <Flex
            sx={{
              alignItems: 'center',
              color: 'gray600',
            }}
          >
            <Inbox size={20} />
          </Flex>

          <Text
            as="span"
            sx={{
              fontSize: '2',
              fontWeight: '800',
              mx: 2,
              letterSpacing: '1.4px',
              textTransform: 'uppercase',
            }}
          >
            Library
          </Text>
        </Flex>

        <Library roomPlaylistRecordsReorder={roomPlaylistRecordsReorder} roomPlaylistRecords={roomPlaylistRecords} />
      </Box>

      <Box
        sx={{
          flex: '1 0 auto',
          height: '40%',
          overflowY: 'scroll',
        }}
      >
        <Flex
          sx={{
            alignItems: 'center',
            pb: 2,
          }}
        >
          <Flex
            sx={{
              alignItems: 'center',
              color: 'gray600',
            }}
          >
            <List size={20} />
          </Flex>
          <Text
            as="span"
            sx={{
              mx: 2,
              fontSize: '2',
              fontWeight: '800',
              letterSpacing: '1.4px',
              textTransform: 'uppercase',
            }}
          >
            My Queue
          </Text>
        </Flex>
        <UserPlaylist
          roomPlaylistRecordsReorder={roomPlaylistRecordsReorder}
          roomPlaylistRecords={roomPlaylistRecords}
          setRoomPlaylistRecords={setRoomPlaylistRecords}
        />
      </Box>
    </>
  )
}

export default PlaylistManagement
