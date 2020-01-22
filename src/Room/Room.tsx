import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'

import Box from 'components/Box'
import PlaylistManagement from 'PlaylistManagement'
import YoutubeSearch from 'YoutubeSearch'
import RoomPlaylist from 'RoomPlaylist'

import { ROOM_ACTIVATE, RoomActivate, Room as RoomType } from './graphql'
import Users from './Users'

const Room: React.FC = () => {
  const { id } = useParams()

  const [room, setRoom] = useState<Partial<RoomType>>({})
  const [roomActivate, { data, loading }] = useMutation<RoomActivate['data'], RoomActivate['vars']>(ROOM_ACTIVATE)

  useEffect(() => {
    if (!id) {
      return
    }

    roomActivate({ variables: { roomId: id } })
  }, [id, roomActivate])

  useEffect(() => {
    if (!data) {
      return
    }
    setRoom(data.roomActivate.room)
  }, [data])

  if (!id || !room || loading) {
    return <p>Loading</p>
  }

  return (
    <Box>
      <p>
        Room Name: <strong>{room.name}</strong>
      </p>
      <p>Users In Room</p>
      <Users initialUsers={room.users || []} />

      <p>Playlist Management</p>
      <PlaylistManagement />
      <p>Playlist For Room</p>
      <RoomPlaylist roomId={id} />
      <p>Search</p>
      <YoutubeSearch />
    </Box>
  )
}

export default Room
