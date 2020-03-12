import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Box } from 'rebass'

import { usePlaylistRecordContext } from 'Room'

import { ROOM_PLAYLIST_FOR_USER_QUERY, RoomPlaylistForUserQuery } from './graphql'
import UserPlaylistRecord from './UserPlaylistRecord'

const UserPlaylist: React.FC = () => {
  const { data, loading } = useQuery<RoomPlaylistForUserQuery['data']>(ROOM_PLAYLIST_FOR_USER_QUERY)
  const { deleteRecord, playlistRecords, setPlaylistRecords } = usePlaylistRecordContext()

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
    const onDelete = (): void => deleteRecord(record.id, { persist: true })
    return <UserPlaylistRecord key={record.id} record={record} onDelete={onDelete} />
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
