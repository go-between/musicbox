import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { RoomPlaylistRecordsReorder } from './PlaylistManagement'
import { SONGS_QUERY, OrderedRecord, RoomPlaylistRecord, SongsQuery } from './graphql'

type Props = {
  roomPlaylistRecordsReorder: RoomPlaylistRecordsReorder[0]
  roomPlaylistRecords: RoomPlaylistRecord[]
}
const Library: React.FC<Props> = ({ roomPlaylistRecordsReorder, roomPlaylistRecords }) => {
  const { data, loading } = useQuery<SongsQuery['data']>(SONGS_QUERY)

  if (loading) {
    return <p>Loading...</p>
  }

  const songs = data?.songs.map(s => {
    const addSong = (): void => {
      const orderedRecords: OrderedRecord[] = roomPlaylistRecords.map(record => ({
        roomPlaylistRecordId: record.id,
        songId: record.song.id,
      }))

      orderedRecords.push({ songId: s.id })

      roomPlaylistRecordsReorder({ variables: { orderedRecords } })
    }
    return (
      <li key={s.id}>
        {s.name} <button onClick={addSong}>Add</button>{' '}
      </li>
    )
  })
  return <ul>{songs}</ul>
}

export default Library
