import React, { createContext, useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'

import { useUserContext } from '../UserContextProvider'
import { useWebsocketContext } from '../WebsocketContextProvider'

import {
  OrderedRecord,
  PlaylistRecord,
  RoomPlaylistRecordsReorderMutation,
  RoomPlaylistQuery,
  ROOM_PLAYLIST_RECORDS_REORDER,
  ROOM_PLAYLIST_QUERY,
} from './graphql'

type PlaylistRecordsContext = {
  addRecords: (songId: string) => void
  deleteRecord: (recordId: string) => void
  playlistRecords: PlaylistRecord[]
  userPlaylistRecords: PlaylistRecord[]
  reorderRecords: (records: PlaylistRecord[]) => void
  setPlaylistRecords: (records: PlaylistRecord[]) => void
}

const PlaylistRecordsContext = createContext<Partial<PlaylistRecordsContext>>({})
export const PlaylistRecordsContextProvider: React.FC = ({ children }) => {
  const user = useUserContext()
  const websocket = useWebsocketContext()

  const [playlistRecords, setPlaylistRecords] = useState<PlaylistRecord[]>([])
  const [userPlaylistRecords, setUserPlaylistRecords] = useState<PlaylistRecord[]>([])

  useEffect(() => {
    return websocket.subscribeToRoomPlaylist(roomPlaylist => {
      setPlaylistRecords(roomPlaylist)
    })
  }, [websocket])

  useEffect(() => {
    setUserPlaylistRecords(playlistRecords.filter(r => r.user.id === user?.id))
  }, [playlistRecords, user])

  useQuery<RoomPlaylistQuery['data'], RoomPlaylistQuery['vars']>(ROOM_PLAYLIST_QUERY, {
    variables: { roomId: user?.activeRoom?.id },
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setPlaylistRecords(data.roomPlaylist)
    },
    skip: !user || !user?.activeRoom,
  })

  const [playlistRecordsReorder] = useMutation<
    RoomPlaylistRecordsReorderMutation['data'],
    RoomPlaylistRecordsReorderMutation['vars']
  >(ROOM_PLAYLIST_RECORDS_REORDER)

  const addRecords = (...songIds: string[]): void => {
    const orderedRecords: OrderedRecord[] = userPlaylistRecords.map(r => ({
      roomPlaylistRecordId: r.id,
      songId: r.song.id,
    }))

    songIds.forEach(songId => orderedRecords.push({ songId }))
    playlistRecordsReorder({ variables: { orderedRecords } })
  }

  const deleteRecord = (recordId: string): void => {
    const remainingRecords = userPlaylistRecords.filter(r => r.id !== recordId)
    const orderedRecords = remainingRecords.map(record => ({
      roomPlaylistRecordId: record.id,
      songId: record.song.id,
    }))

    playlistRecordsReorder({ variables: { orderedRecords } })
  }

  const reorderRecords = (records: PlaylistRecord[]): void => {
    const orderedRecords: OrderedRecord[] = records.map(r => ({
      roomPlaylistRecordId: r.id,
      songId: r.song.id,
    }))

    playlistRecordsReorder({ variables: { orderedRecords } })
  }

  return (
    <PlaylistRecordsContext.Provider
      value={{ addRecords, deleteRecord, playlistRecords, userPlaylistRecords, reorderRecords, setPlaylistRecords }}
    >
      {children}
    </PlaylistRecordsContext.Provider>
  )
}
export const usePlaylistRecordsContext: () => PlaylistRecordsContext = () => {
  const {
    addRecords,
    deleteRecord,
    playlistRecords,
    userPlaylistRecords,
    reorderRecords,
    setPlaylistRecords,
  } = useContext(PlaylistRecordsContext)

  if (
    addRecords === undefined ||
    deleteRecord === undefined ||
    playlistRecords === undefined ||
    userPlaylistRecords === undefined ||
    reorderRecords === undefined ||
    setPlaylistRecords === undefined
  ) {
    throw new Error('PlaylistRecordsContext accessed before being set')
  }

  return {
    addRecords,
    deleteRecord,
    playlistRecords,
    userPlaylistRecords,
    reorderRecords,
    setPlaylistRecords,
  }
}
