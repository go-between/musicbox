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
    <Box
      sx={{
        mx: 'auto',
        position: 'relative'
      }}
    >
      <Flex
        bg="background"
        alignItems="top"
        sx={{
          minHeight: '100vh',
        }}
      >
        <Box
          as="aside"
          sx={{
            bg: 'background',
            borderRight: '1px solid',
            borderColor: 'muted',
            height: '100vh',
            overflow: 'hidden',
            position: 'static',
            p: 4,
            width: ['33%', '25%'],
          }}
        >
          <Box
            sx={{
              mb: 4,
            }}
          >
            <YoutubeSearch />
          </Box>


          <PlaylistManagement />
        </Box>

        <Box
          sx={{
            backgroundImage: 'linear-gradient(#1A202C, #293142)',
            width: ['33%', '50%']
          }}
        >
          <Box
            as="main"
            sx={{
              height: '400px',
              p: 4,
            }}
          >
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
                  color: 'text',
                  fontWeight: '400',
                  fontSize: 3
                }}
              >
                <Users initialUsers={room.users || []} />
              </Text>
            </Heading>

            <Box mb={4}>
              <Player currentRecord={room.currentRecord} />
            </Box>


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
                  textTransform: 'uppercase'
                }}
              >
                Room Playlist
              </Text>
            </Flex>
            <RoomPlaylist roomId={id} />
          </Box>
        </Box>

        <Box
          bg="background"
          sx={{
            borderLeft: '1px solid',
            borderColor: 'muted',
            color: 'text',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '100vh',
            overflow: 'scroll',
            p: 4,
            position: 'static',
            width: ['33%', '25%'],
          }}
        >
          <Messages />
          <MessageEntry />
        </Box>
      </Flex>
    </Box>
  )
}

export default Room
