import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'

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
      <li key={record.id}>
        {record.song.name}
        <button onClick={remove(record.id)}>Remove</button>
      </li>
    )
  })
  return <ul>{records}</ul>
}

export default UserPlaylist
