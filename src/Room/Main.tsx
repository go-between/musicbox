import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading } from 'rebass'

import Player from 'Player'
import QuickAdd from 'QuickAdd'
import RoomPlaylist from 'RoomPlaylist'
import RoomHistory from 'RoomHistory'
import UserPlaylist from 'UserPlaylist'
import Users from './Users'
import { useCurrentRecordContext } from 'Room'

import { Room as RoomType } from './graphql'

type MainComponentProps = {
  roomId: string
  component: 'userPlaylist' | 'roomPlaylist' | 'roomHistory'
}
const MainComponent: React.FC<MainComponentProps> = ({ roomId, component }) => {
  switch (component) {
    case 'userPlaylist':
      return <UserPlaylist />
    case 'roomPlaylist':
      return <RoomPlaylist roomId={roomId} />
    case 'roomHistory':
      return <RoomHistory roomId={roomId} />
  }
}

const Main: React.FC<{ room: RoomType }> = ({ room }) => {
  const [tab, setTab] = useState<'userPlaylist' | 'roomPlaylist' | 'roomHistory'>('userPlaylist')
  const selectUserPlaylist = (): void => setTab('userPlaylist')
  const selectRoomPlaylist = (): void => setTab('roomPlaylist')
  const selectRoomHistory = (): void => setTab('roomHistory')

  // TODO:  Sort of a hack to ensure current record is set after room has
  // been activated.  This should be pulled out.
  const { setCurrentRecord } = useCurrentRecordContext()
  const { currentRecord } = room
  useEffect(() => {
    setCurrentRecord(currentRecord)
  }, [currentRecord, setCurrentRecord])

  return (
    <Flex
      as="main"
      sx={{
        flexDirection: 'column',
        height: '100vh',
        p: 4,
        width: ['100%', '60%'],
      }}
    >
      <Box>
        <QuickAdd />
      </Box>

      <Box
        sx={{
          overflowY: 'scroll',
        }}
      >
        <Box>
          <Users initialUsers={room.users} />
        </Box>

        <Box>
          <Player />
        </Box>

        <Box
          sx={{
            py: 3,
          }}
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            sx={{ borderBottom: 'thin solid', borderBottomColor: 'accent' }}
          >
            <Box
              onClick={selectUserPlaylist}
              sx={{
                textAlign: 'center',
                width: '100%',
                cursor: tab === 'userPlaylist' ? 'default' : 'pointer',
                bg: tab === 'userPlaylist' ? 'accent' : 'inherit',
                p: 2,
                '&:hover': { bg: 'accent' },
              }}
            >
              <Heading>User Playlist</Heading>
            </Box>
            <Box
              onClick={selectRoomPlaylist}
              sx={{
                textAlign: 'center',
                width: '100%',
                cursor: tab === 'roomPlaylist' ? 'default' : 'pointer',
                bg: tab === 'roomPlaylist' ? 'accent' : 'inherit',
                p: 2,
                '&:hover': { bg: 'accent' },
              }}
            >
              <Heading>Room Playlist</Heading>
            </Box>
            <Box
              onClick={selectRoomHistory}
              sx={{
                textAlign: 'center',
                width: '100%',
                cursor: tab === 'roomHistory' ? 'default' : 'pointer',
                bg: tab === 'roomHistory' ? 'accent' : 'inherit',
                p: 2,
                '&:hover': { bg: 'accent' },
              }}
            >
              <Heading>Room History</Heading>
            </Box>
          </Flex>
        </Box>

        <Flex flexDirection="column">
          <MainComponent roomId={room.id} component={tab} />
        </Flex>
      </Box>
    </Flex>
  )
}

export default Main
