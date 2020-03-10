import React, { createContext, useContext, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import {
  ROOM_PLAYLIST_RECORDS_REORDER,
  OrderedRecord,
  RoomPlaylistRecord,
  RoomPlaylistRecordsReorderMutation,
} from './graphql'

type PlaylistRecordContext = {
  addRecord: (songId: string) => void
  deleteRecord: (recordId: string, options: { persist: boolean }) => void
  playlistRecords: RoomPlaylistRecord[]
  playlistRecordsReorder: (options: { variables: { orderedRecords: OrderedRecord[] } }) => void
  setPlaylistRecords: (records: RoomPlaylistRecord[]) => void
}

const PlaylistRecordContext = createContext<Partial<PlaylistRecordContext>>({})
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

  const deleteRecord = (recordId: string, options: { persist: boolean }): void => {
    const remainingRecords = playlistRecords.filter(r => r.id !== recordId)

    if (options.persist) {
      const orderedRecords = remainingRecords.map(record => ({
        roomPlaylistRecordId: record.id,
        songId: record.song.id,
      }))

      playlistRecordsReorder({ variables: { orderedRecords } })
    } else {
      setPlaylistRecords(remainingRecords)
    }
  }

  return (
    <PlaylistRecordContext.Provider
      value={{ addRecord, deleteRecord, playlistRecords, setPlaylistRecords, playlistRecordsReorder }}
    >
      {children}
    </PlaylistRecordContext.Provider>
  )
}
export const usePlaylistRecordContext: () => PlaylistRecordContext = () => {
  const { addRecord, deleteRecord, playlistRecords, playlistRecordsReorder, setPlaylistRecords } = useContext(
    PlaylistRecordContext,
  )

  if (
    addRecord === undefined ||
    deleteRecord === undefined ||
    playlistRecords === undefined ||
    playlistRecordsReorder === undefined ||
    setPlaylistRecords === undefined
  ) {
    throw new Error('PlaylistRecordContext accessed before being set')
  }

  return {
    addRecord,
    deleteRecord,
    playlistRecords,
    playlistRecordsReorder,
    setPlaylistRecords,
  }
}
export default PlaylistRecordContextProvider
