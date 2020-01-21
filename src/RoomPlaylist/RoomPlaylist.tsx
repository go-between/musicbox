import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { WebsocketContext } from 'App'

import { ROOM_PLAYLIST_QUERY, RoomPlaylistQuery, RoomPlaylistRecord } from './graphql'

type Props = {
  roomId: string
}

const RoomPlaylist: React.FC<Props> = ({ roomId }) => {
  const [playlistRecords, setPlaylistRecords] = useState<RoomPlaylistRecord[]>([])

  const { data, loading } = useQuery<RoomPlaylistQuery['data'], RoomPlaylistQuery['vars']>(ROOM_PLAYLIST_QUERY, {
    variables: { roomId },
  })

  useEffect(() => {
    if (data) {
      setPlaylistRecords(data.roomPlaylist)
    }
  }, [data])

  const websocket = useContext(WebsocketContext)

  useEffect(() => {
    if (!websocket) {
      return
    }
    console.log('HI!', websocket)
    return websocket.subscribeToRoomPlaylist(roomPlaylist => {
      setPlaylistRecords(roomPlaylist)
    })
  }, [websocket])

  if (loading) {
    return <p>Loading...</p>
  }

  const records = playlistRecords.map(record => {
    return (
      <li key={record.id}>
        {record.song.name} ({record.user.name})
      </li>
    )
  })
  return <ul>{records}</ul>
}

export default RoomPlaylist
