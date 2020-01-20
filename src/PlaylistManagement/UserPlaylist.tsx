import React, { useContext, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { ROOM_PLAYLIST_FOR_USER_QUERY, RoomPlaylistForUserQuery } from './graphql'
import { PlaylistManagementContext } from './PlaylistManagement'

const UserPlaylist: React.FC = () => {
  const { data, loading } = useQuery<RoomPlaylistForUserQuery['data']>(ROOM_PLAYLIST_FOR_USER_QUERY)
  const { roomPlaylistRecords, setRoomPlaylistRecords } = useContext(PlaylistManagementContext)

  useEffect(() => {
    if (!data || !setRoomPlaylistRecords) {
      return
    }

    setRoomPlaylistRecords(data.roomPlaylistForUser)
  }, [data, setRoomPlaylistRecords])

  if (loading) {
    return <p>Loading...</p>
  }

  const records = roomPlaylistRecords?.map(record => {
    return <li key={record.id}>{record.song.name}</li>
  })
  return <ul>{records}</ul>
}

export default UserPlaylist
