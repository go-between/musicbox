import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import { Box, Flex, Heading, Text } from 'rebass'

import Player from 'Player'
import PlaylistManagement from 'PlaylistManagement'
import RoomPlaylist from 'RoomPlaylist'
import YoutubeSearch from 'YoutubeSearch'

import { ROOM_ACTIVATE, RoomActivate, Room as RoomType } from './graphql'
import MessageEntry from './MessageEntry'
import Messages from './Messages'
import Users from './Users'

import Container from '../components/Container'
import { fontSize } from 'styled-system'

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
    <Box
      sx={{
        mx: 'auto',
        p: 4,
      }}
    >
      <Flex
        alignItems="top"
      >
        <Box width="25%">
          <Heading
            sx={{
              fontSize: '3',
              pb: 4,
            }}
          >
            Room Name
            <Text
              sx={{
                color: 'gray700',
                fontWeight: '400',
                fontSize: 3
              }}
            >
              {room.name}
            </Text>
          </Heading>

          <Heading
            sx={{
              fontSize: '3',
              pb: 4,
            }}
          >
            Active Users
            <Text
              sx={{
                color: 'gray700',
                fontWeight: '400',
                fontSize: 3
              }}
            >
              <Users initialUsers={room.users || []} />
            </Text>
          </Heading>

          <Box>


            <p>Search</p>
            <YoutubeSearch />
            <p>Playlist Management</p>
            <PlaylistManagement />
          </Box>
        </Box>

        <Box width="50%">
          <Box
            sx={{
              height: '400px'
            }}
          >
            <Player currentRecord={room.currentRecord} />
            <p>Playlist For Room</p>
            <RoomPlaylist roomId={id} />
          </Box>
        </Box>

        <Box width="25%">
          <Messages />
          <MessageEntry />
        </Box>
      </Flex>
    </Box>
  )
}

export default Room
