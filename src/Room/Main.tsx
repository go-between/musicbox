import React, { useEffect, useRef, useState } from 'react'
import { Box, Flex, Text } from 'rebass'
import { Clock, User as UserPlaylistIcon, Users as RoomPlaylistIcon } from 'react-feather'

import RoomPlaylist from 'RoomPlaylist'
import RoomHistory from 'RoomHistory'
import UserPlaylist from 'UserPlaylist'
import { useCurrentRecordContext, useVideoContext } from 'Context'

// import JumpMenuEntry from './JumpMenuEntry'
import { Room as RoomType } from './graphql'

const Main: React.FC<{ room: RoomType }> = ({ room }) => {
  type Tabs = 'userPlaylist' | 'roomPlaylist' | 'roomHistory'
  const [tab, setTab] = useState<Tabs>('userPlaylist')
  const selectUserPlaylist = (): void => setTab('userPlaylist')
  const selectRoomPlaylist = (): void => setTab('roomPlaylist')
  const selectRoomHistory = (): void => setTab('roomHistory')

  // TODO:  Sort of a hack to ensure current record is set after room has
  // been activated.  This should be pulled out.
  const { currentRecord, setCurrentRecord } = useCurrentRecordContext()
  const { setVideoRef } = useVideoContext()
  useEffect(() => {
    setCurrentRecord(room.currentRecord)
  }, [room, setCurrentRecord])

  const components: { [k: string]: React.FC } = {
    userPlaylist: UserPlaylist,
    roomPlaylist: RoomPlaylist,
    roomHistory: RoomHistory,
  }
  const Component = components[tab]
  const videoRef = useRef()

  setVideoRef(videoRef)
  useEffect(() => {
    return () => setVideoRef(null)
  }, [setVideoRef])

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        height: '100%',
        p: 4,
        width: ['100%', '50%'],
      }}
    >
      {/* <Box>
        <JumpMenuEntry />
      </Box> */}

      <Box
        sx={{
          overflowY: 'scroll',
        }}
      >
        <Flex
          ref={videoRef}
          sx={{
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'accent',
            borderRadius: 6,
            boxShadow: 'xl',
            height: '350px',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Text>{!!currentRecord ? 'Video Hidden' : 'Nothing Playing'}</Text>
        </Flex>

        <Box
          sx={{
            py: 3,
          }}
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            sx={{ borderBottom: '1px solid', borderBottomColor: 'accent' }}
          >
            <Box
              onClick={selectUserPlaylist}
              sx={{
                alignItems: 'center',
                borderBottom: '3px solid',
                borderColor: tab === 'userPlaylist' ? 'primary' : 'transparent',
                cursor: tab === 'userPlaylist' ? 'default' : 'pointer',
                display: 'flex',
                fontWeight: tab === 'userPlaylist' ? '600' : '400',
                justifyContent: 'flex-start',
                py: 2,
                px: 3,
                textAlign: 'center',
                width: '100%',
                '&:hover': {
                  bg: 'accent',
                  borderTopRightRadius: 6,
                  borderTopLeftRadius: 6,
                },
              }}
            >
              <Box as={UserPlaylistIcon} mr={2} size={18} color="muted" />
              <Text>User Playlist</Text>
            </Box>
            <Box
              onClick={selectRoomPlaylist}
              sx={{
                alignItems: 'center',
                borderBottom: '3px solid',
                borderColor: tab === 'roomPlaylist' ? 'primary' : 'transparent',
                cursor: tab === 'roomPlaylist' ? 'default' : 'pointer',
                display: 'flex',
                fontWeight: tab === 'roomPlaylist' ? '600' : '400',
                justifyContent: 'flex-start',
                py: 2,
                px: 3,
                textAlign: 'center',
                width: '100%',
                '&:hover': {
                  bg: 'accent',
                  borderTopRightRadius: 6,
                  borderTopLeftRadius: 6,
                },
              }}
            >
              <Box as={RoomPlaylistIcon} mr={2} size={18} color="muted" />
              <Text>Room Playlist</Text>
            </Box>
            <Box
              onClick={selectRoomHistory}
              sx={{
                alignItems: 'center',
                borderBottom: '3px solid',
                borderColor: tab === 'roomHistory' ? 'primary' : 'transparent',
                cursor: tab === 'roomHistory' ? 'default' : 'pointer',
                display: 'flex',
                fontWeight: tab === 'roomHistory' ? '600' : '400',
                justifyContent: 'flex-start',
                py: 2,
                px: 3,
                width: '100%',
                '&:hover': {
                  bg: 'accent',
                  borderTopRightRadius: 6,
                  borderTopLeftRadius: 6,
                },
              }}
            >
              <Box as={Clock} mr={2} size={18} color="muted" />
              <Text>Room History</Text>
            </Box>
          </Flex>
        </Box>

        <Flex flexDirection="column">
          <Component />
        </Flex>
      </Box>
    </Flex>
  )
}

export default Main
