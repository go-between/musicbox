import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { StateAction } from 'lib/types'
import { ROOM_PLAYLIST_FOR_USER_QUERY, RoomPlaylistRecord, RoomPlaylistForUserQuery } from './graphql'

type Props = {
  roomPlaylistRecords: RoomPlaylistRecord[]
  setRoomPlaylistRecords: StateAction<RoomPlaylistRecord[]>
}

const UserPlaylist: React.FC<Props> = ({ roomPlaylistRecords, setRoomPlaylistRecords }) => {
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

  const records = roomPlaylistRecords?.map(record => {
    return <li key={record.id}>{record.song.name}</li>
  })
  return <ul>{records}</ul>
}

export default UserPlaylist
