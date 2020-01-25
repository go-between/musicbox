import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'

import { RoomPlaylistRecordsReorder } from './PlaylistManagement'
import {
  SONGS_QUERY,
  USER_LIBRARY_RECORD_DELETE_MUTATION,
  OrderedRecord,
  RoomPlaylistRecord,
  SongsQuery,
  UserLibraryRecordDeleteMutation,
} from './graphql'

type Props = {
  roomPlaylistRecordsReorder: RoomPlaylistRecordsReorder[0]
  roomPlaylistRecords: RoomPlaylistRecord[]
}
const Library: React.FC<Props> = ({ roomPlaylistRecordsReorder, roomPlaylistRecords }) => {
  const { data, loading } = useQuery<SongsQuery['data']>(SONGS_QUERY)
  const [userLibraryRecordDelete] = useMutation<
    UserLibraryRecordDeleteMutation['data'],
    UserLibraryRecordDeleteMutation['vars']
  >(USER_LIBRARY_RECORD_DELETE_MUTATION, { refetchQueries: ['SongsQuery'] })

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

    const deleteSong = (): void => {
      userLibraryRecordDelete({ variables: { id: s.id } })
    }
    return (
      <li key={s.id}>
        {s.name} <button onClick={addSong}>Enqueue</button>
        <button onClick={deleteSong}>Delete from Library</button>{' '}
      </li>
    )
  })
  return <ul>{songs}</ul>
}

export default Library
