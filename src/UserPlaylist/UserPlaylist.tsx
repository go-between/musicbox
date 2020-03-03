import React, { useContext, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Box } from 'rebass'
import { X } from 'react-feather'

import { PlaylistRecordContext } from 'Room'

import { ROOM_PLAYLIST_FOR_USER_QUERY, RoomPlaylistForUserQuery } from './graphql'

const UserPlaylist: React.FC = () => {
  const { data, loading } = useQuery<RoomPlaylistForUserQuery['data']>(ROOM_PLAYLIST_FOR_USER_QUERY)
  const { deleteRecord, playlistRecords, setPlaylistRecords } = useContext(PlaylistRecordContext)

  useEffect(() => {
    if (!data) {
      return
    }

    setPlaylistRecords(data.roomPlaylistForUser)
  }, [data, setPlaylistRecords])

  if (loading) {
    return <p>Loading...</p>
  }

  const records = playlistRecords.map(record => {
    const removeRecord = (): void => deleteRecord(record.id, { persist: true })
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
          onClick={removeRecord}
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
            },
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
