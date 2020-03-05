import React, { useState } from 'react'
import { Button, Box, Flex, Text } from 'rebass'

import Player from 'Player'
import QuickAdd from 'QuickAdd'
import RoomPlaylist from 'RoomPlaylist'
import UserPlaylist from 'UserPlaylist'

import { Room as RoomType } from './graphql'

const Main: React.FC<{ room: RoomType }> = ({ room }) => {
  const [tab, setTab] = useState('userPlaylist')
  const selectUserPlaylist = (): void => setTab('userPlaylist')
  const selectRoomPlaylist = (): void => setTab('roomPlaylist')

  return (
    <Flex
      as="main"
      sx={{
        flexDirection: 'column',
        height: '100vh',
        p: 4,
        width: '60%',
      }}
    >
      <Text as="h1">{room.name}</Text>
      <QuickAdd />
      <Flex height="500px">
        <Player currentRecord={room.currentRecord} />
      </Flex>

      <Flex flexDirection="column">
        <Flex justifyContent="space-between">
          <Button
            disabled={tab === 'userPlaylist'}
            onClick={selectUserPlaylist}
            sx={{
              ':disabled': {
                pointerEvents: 'none',
              },
            }}
          >
            User Playlist
          </Button>
          <Button
            disabled={tab === 'roomPlaylist'}
            onClick={selectRoomPlaylist}
            sx={{
              ':disabled': {
                pointerEvents: 'none',
              },
            }}
          >
            Room Playlist
          </Button>
        </Flex>

        <Box display={tab === 'userPlaylist' ? 'block' : 'none'}>
          <UserPlaylist />
        </Box>
        <Box display={tab === 'roomPlaylist' ? 'block' : 'none'}>
          <RoomPlaylist roomId={room.id} />
        </Box>
      </Flex>
    </Flex>
  )
}

export default Main
