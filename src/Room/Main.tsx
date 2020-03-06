import React, { useState } from 'react'
import { Button, Box, Flex, Heading, Text } from 'rebass'

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
      <QuickAdd />
      <Heading
        sx={{
          fontSize: [3,4,5]
        }}
      >
        {room.name}
      </Heading>

      <Box minHeight={['auto', 'auto', '500px']}>
        <Player currentRecord={room.currentRecord} />
      </Box>

      <Flex flexDirection="row">
        <Box mr={3}>
          <Button
            disabled={tab === 'userPlaylist'}
            onClick={selectUserPlaylist}
            variant="transparent"
            sx={{
              bg: tab === 'roomPlaylist' ? 'transparent' : 'accent',
              cursor: 'pointer',
              ':disabled': {
                pointerEvents: 'none',
              },
              ':hover': {
                bg: 'accent'
              }
            }}
          >
            User Playlist
          </Button>
        </Box>

        <Box>
          <Button
            disabled={tab === 'roomPlaylist'}
            onClick={selectRoomPlaylist}
            variant="transparent"
            sx={{
              bg: tab === 'roomPlaylist' ? 'accent' : 'transparent',
              cursor: 'pointer',
              ':disabled': {
                pointerEvents: 'none',
              },
              ':hover': {
                bg: 'accent'
              }
            }}
          >
            Room Playlist
          </Button>
        </Box>
      </Flex>

      <Flex
        sx={{
          overflowY: 'scroll'
        }}
        flexDirection="column"
      >
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
