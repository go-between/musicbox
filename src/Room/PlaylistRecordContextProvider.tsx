import React, { createContext, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import {
  ROOM_PLAYLIST_RECORDS_REORDER,
  OrderedRecord,
  RoomPlaylistRecord,
  RoomPlaylistRecordsReorderMutation,
} from './graphql'

type PlaylistRecordContext = {
  addRecord: (songId: string) => void
  deleteRecord: (recordId: string) => void
  playlistRecords: RoomPlaylistRecord[]
  playlistRecordsReorder: (options: { variables: { orderedRecords: OrderedRecord[] } }) => void
  setPlaylistRecords: (records: RoomPlaylistRecord[]) => void
}
export const PlaylistRecordContext = createContext<PlaylistRecordContext>({
  addRecord: (songId: string) => {
    console.log('addRecord must be redefined', songId)
  },
  deleteRecord: (recordId: string) => {
    console.log('deleteRecord must be redefined', recordId)
  },
  playlistRecords: [],
  playlistRecordsReorder: () => {
    console.log('playlistRecordsReorder must be redefined')
  },
  setPlaylistRecords: (records: RoomPlaylistRecord[]) => {
    console.log('setPlaylistRecords must be redeifined', records)
  },
})

const PlaylistRecordContextProvider: React.FC = ({ children }) => {
  const [playlistRecords, setPlaylistRecords] = useState<RoomPlaylistRecord[]>([])

  const playlistRecordOnComplete = (data: RoomPlaylistRecordsReorderMutation['data']): void => {
    setPlaylistRecords(data.roomPlaylistRecordsReorder.roomPlaylistRecords)
  }

  const [playlistRecordsReorder] = useMutation<
    RoomPlaylistRecordsReorderMutation['data'],
    RoomPlaylistRecordsReorderMutation['vars']
  >(ROOM_PLAYLIST_RECORDS_REORDER, { onCompleted: playlistRecordOnComplete })

  const addRecord = (songId: string): void => {
    const orderedRecords: OrderedRecord[] = playlistRecords.map(r => ({
      roomPlaylistRecordId: r.id,
      songId: r.song.id,
    }))
    orderedRecords.push({ songId })

    playlistRecordsReorder({ variables: { orderedRecords } })
  }

  const deleteRecord = (recordId: string): void => {
    const orderedRecords = playlistRecords
      .filter(r => r.id !== recordId)
      .map(record => ({
        roomPlaylistRecordId: record.id,
        songId: record.song.id,
      }))

    playlistRecordsReorder({ variables: { orderedRecords } })
  }

  return (
    <PlaylistRecordContext.Provider
      value={{ addRecord, deleteRecord, playlistRecords, setPlaylistRecords, playlistRecordsReorder }}
    >
      {children}
    </PlaylistRecordContext.Provider>
  )
}
export default PlaylistRecordContextProvider
