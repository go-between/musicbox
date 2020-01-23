import React, { useEffect, useState } from 'react'
import { useMutation, MutationTuple } from '@apollo/react-hooks'

import Library from './Library'
import UserPlaylist from './UserPlaylist'

import { ROOM_PLAYLIST_RECORDS_REORDER, RoomPlaylistRecord, RoomPlaylistRecordsReorderMutation } from './graphql'

export type RoomPlaylistRecordsReorder = MutationTuple<
  RoomPlaylistRecordsReorderMutation['data'],
  RoomPlaylistRecordsReorderMutation['vars']
>
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
    <>
      <p>Quick add from library</p>
      <Library roomPlaylistRecordsReorder={roomPlaylistRecordsReorder} roomPlaylistRecords={roomPlaylistRecords} />
      <p>Songs enqueued by me</p>
      <UserPlaylist roomPlaylistRecords={roomPlaylistRecords} setRoomPlaylistRecords={setRoomPlaylistRecords} />
    </>
  )
}

export default PlaylistManagement
