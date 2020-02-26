import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import { Box, Flex, Heading, Text } from 'rebass'
import { Speaker } from 'react-feather'

import Player from 'Player'
import PlaylistManagement from 'PlaylistManagement'
import RoomPlaylist from 'RoomPlaylist'
import YoutubeSearch from 'YoutubeSearch'

import { ROOM_ACTIVATE, RoomActivate, Room as RoomType } from './graphql'
import MessageEntry from './MessageEntry'
import Messages from './Messages'
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
    <Flex
      sx={{
        alignItems: 'top',
        bg: 'background',
        flexDirection: ['column', 'row'],
        minHeight: '100vh',
        mx: 'auto',
        position: 'relative',
      }}
    >
      <Flex
        as="aside"
        sx={{
          bg: 'background',
          borderRight: '1px solid',
          borderColor: 'muted',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'space-between',
          overflow: 'hidden',
          p: 4,
          width: ['100%', '600px'],
        }}
      >
        <YoutubeSearch />
        <PlaylistManagement />
      </Flex>

      <Flex
        as="main"
        sx={{
          flexDirection: 'column',
          height: '100vh',
          p: 4,
          width: '100%',
        }}
      >
        <Player currentRecord={room.currentRecord} />
        <Flex
          sx={{
            color: 'text',
            flexDirection: 'column',
            height: '100vh',
            justifyContent: 'flex-end',
            overflow: 'scroll',
          }}
        >
          <Messages />
          <MessageEntry />
        </Flex>
      </Flex>

      <Flex
        as="aside"
        sx={{
          borderLeft: '1px solid',
          borderColor: 'muted',
          color: 'text',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'flex-start',
          overflow: 'scroll',
          p: 4,
          width: ['100%', '600px'],
        }}
      >
        <Box>
          <Heading
            sx={{
              fontSize: '3',
              pb: 4,
            }}
          >
            Room Name
            <Text
              sx={{
                color: 'text',
                fontWeight: '400',
                fontSize: 3,
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
                color: 'text',
                fontWeight: '400',
                fontSize: 3,
              }}
            >
              <Users initialUsers={room.users || []} />
            </Text>
          </Heading>
        </Box>
        <Box
          sx={{
            overflowY: 'scroll',
          }}
        >
          <Flex
            sx={{
              alignItems: 'center',
              pb: 2,
            }}
          >
            <Flex
              sx={{
                alignItems: 'center',
                color: 'gray600',
              }}
            >
              <Speaker size={20} />
            </Flex>

            <Text
              as="span"
              sx={{
                fontSize: '2',
                fontWeight: '800',
                mx: 2,
                letterSpacing: '1.4px',
                textTransform: 'uppercase',
              }}
            >
              Room Playlist
            </Text>
          </Flex>
          <RoomPlaylist roomId={id} />
        </Box>
      </Flex>
    </Flex>
  )
}

export default Room
