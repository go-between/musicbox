import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Box } from 'rebass'
import { X } from 'react-feather'

import { StateAction } from 'lib/types'
import { RoomPlaylistRecordsReorder } from './PlaylistManagement'
import { ROOM_PLAYLIST_FOR_USER_QUERY, RoomPlaylistRecord, RoomPlaylistForUserQuery } from './graphql'

type Props = {
  roomPlaylistRecords: RoomPlaylistRecord[]
  roomPlaylistRecordsReorder: RoomPlaylistRecordsReorder[0]
  setRoomPlaylistRecords: StateAction<RoomPlaylistRecord[]>
}

const UserPlaylist: React.FC<Props> = ({ roomPlaylistRecords, roomPlaylistRecordsReorder, setRoomPlaylistRecords }) => {
  const { data, loading } = useQuery<RoomPlaylistForUserQuery['data']>(ROOM_PLAYLIST_FOR_USER_QUERY)

  useEffect(() => {
    if (!data) {
      return
    }

    setRoomPlaylistRecords(data.roomPlaylistForUser)
  }, [data, setRoomPlaylistRecords])

  if (loading) {
    return <p>Loading...</p>
  }

  const remove = (id: string) => (): void => {
    const orderedRecords = roomPlaylistRecords
      .filter(r => r.id !== id)
      .map(record => ({
        roomPlaylistRecordId: record.id,
        songId: record.song.id,
      }))

    roomPlaylistRecordsReorder({ variables: { orderedRecords } })
  }

  const records = roomPlaylistRecords?.map(record => {
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
          as="span"
          sx={{
            fontSize: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mr: 2,
          }}
        >
          {record.song.name}
        </Box>

        <Box
          onClick={remove(record.id)}
          sx={{
            alignItems: 'center',
            bg: 'accent',
            borderRadius: 4,
            color: 'text',
            cursor: 'pointer',
            display: 'flex',
            p: 1,
            mx: 1,
            '&:hover': {
              bg: 'muted',
            }
          }}
        >
          <X size={18} />
        </Box>
      </Box>
    )
  })
  return (
    <Box
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

export default UserPlaylist
