import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { PlaylistManagementContext } from './PlaylistManagement'
import { SONGS_QUERY, OrderedRecord, SongsQuery } from './graphql'

const Library: React.FC = () => {
  const { data, loading } = useQuery<SongsQuery['data']>(SONGS_QUERY)

  const { roomPlaylistRecordsReorder, roomPlaylistRecords } = useContext(PlaylistManagementContext)

  if (loading) {
    return <p>Loading...</p>
  }

  const songs = data?.songs.map(s => {
    const addSong = (): void => {
      if (!roomPlaylistRecordsReorder || !roomPlaylistRecords) {
        return
      }

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
