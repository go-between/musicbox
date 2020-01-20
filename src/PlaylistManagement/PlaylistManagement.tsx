import React, { createContext, useEffect, useState } from 'react'
import { useMutation, MutationTuple } from '@apollo/react-hooks'

import { StateAction } from 'lib/types'
import Library from './Library'
import UserPlaylist from './UserPlaylist'

import { ROOM_PLAYLIST_RECORDS_REORDER, RoomPlaylistRecord, RoomPlaylistRecordsReorderMutation } from './graphql'

type RoomPlaylistRecordsReorder = MutationTuple<
  RoomPlaylistRecordsReorderMutation['data'],
  RoomPlaylistRecordsReorderMutation['vars']
>
type PlaylistManagementContext = {
  roomPlaylistRecordsReorder: RoomPlaylistRecordsReorder[0]
  roomPlaylistRecords: RoomPlaylistRecord[]
  setRoomPlaylistRecords: StateAction<RoomPlaylistRecord[]>
}

export const PlaylistManagementContext = createContext<Partial<PlaylistManagementContext>>({})

const PlaylistManagement: React.FC = () => {
  const [roomPlaylistRecords, setRoomPlaylistRecords] = useState<RoomPlaylistRecord[]>([])
  const [roomPlaylistRecordsReorder, { data }] = useMutation<
    RoomPlaylistRecordsReorderMutation['data'],
    RoomPlaylistRecordsReorderMutation['vars']
  >(ROOM_PLAYLIST_RECORDS_REORDER)

  useEffect(() => {
    if (!data?.roomPlaylistRecordsReorder) {
      return
    }

    setRoomPlaylistRecords(data.roomPlaylistRecordsReorder.roomPlaylistRecords)
  }, [data])

  return (
    <PlaylistManagementContext.Provider
      value={{ roomPlaylistRecordsReorder, roomPlaylistRecords, setRoomPlaylistRecords }}
    >
      <p>Quick add from library</p>
      <Library />
      <p>Songs enqueued by me</p>
      <UserPlaylist />
    </PlaylistManagementContext.Provider>
  )
}

export default PlaylistManagement
