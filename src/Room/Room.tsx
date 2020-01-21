import React, { useEffect, useState } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import { Box } from 'rebass'

import PlaylistManagement from 'PlaylistManagement'
import YoutubeSearch from 'YoutubeSearch'
import RoomPlaylist from 'RoomPlaylist'

import { ROOM_ACTIVATE, ROOMS_QUERY, RoomsQuery } from './graphql'
import Users from './Users'

const Room: React.FC = () => {
  const { id } = useParams()

  const [active, setActive] = useState(false)
  const [roomActivate] = useMutation(ROOM_ACTIVATE, { onCompleted: () => setActive(true) })

  useEffect(() => {
    roomActivate({ variables: { roomId: id } })
  }, [id, roomActivate])

  const [loadUsers, { data }] = useLazyQuery<RoomsQuery['data'], RoomsQuery['vars']>(ROOMS_QUERY, { variables: { id } })

  useEffect(() => {
    if (!active) {
      return
    }

    loadUsers()
  }, [active, loadUsers])

  if (!id) {
    return <></>
  }

  if (!active) {
    return <p>Loading</p>
  }

  return (
    <Box>
      <p>
        Room Name: <strong>{data?.room.name}</strong>
      </p>
      <p>Users In Room</p>
      <Users initialUsers={data?.room.users || []} />

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
