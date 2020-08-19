import React, { useState } from 'react'
import { Box, Flex, Text } from 'rebass'
import Gravatar from 'react-gravatar'
import { Clock, List, Radio } from 'react-feather'

import { Modal } from 'components'
import { useCurrentRecordContext } from 'Context'
import RoomPlaylist from 'RoomPlaylist'
import RoomHistory from 'RoomHistory'
import UserPlaylist from 'UserPlaylist'

type Tabs = 'userPlaylist' | 'roomPlaylist' | 'roomHistory'

export const VideoDetails: React.FC = () => {
  const { currentRecord } = useCurrentRecordContext()
  const [showModal, setShowModal] = useState(false)
  const closeModal = (): void => setShowModal(false)

  const [tab, setTab] = useState<Tabs>('userPlaylist')
  const selectUserPlaylist = (): void => {
    setShowModal(true)
    setTab('userPlaylist')
  }
  const selectRoomPlaylist = (): void => {
    setShowModal(true)
    setTab('roomPlaylist')
  }

  const selectRoomHistory = (): void => {
    setShowModal(true)
    setTab('roomHistory')
  }

  const components: { [k: string]: React.FC } = {
    userPlaylist: UserPlaylist,
    roomPlaylist: RoomPlaylist,
    roomHistory: RoomHistory,
  }

  const Component = components[tab]

  if (!currentRecord) {
    return <></>
  }

  return (
    <>
      <Box>
        <Flex
          sx={{
            alignItems: 'center',
            bg: 'accentHover',
            borderRadius: 6,
            justifyContent: 'space-between',
            px: 3,
            py: 3,
            my: 3,
            width: '100%',
          }}
        >
          <Flex
            sx={{
              alignItems: 'center',
              flex: 1,
            }}
          >
            <Flex alignItems="center">
              <Gravatar
                email={currentRecord.user.email}
                size={36}
                style={{ borderRadius: '100%' }}
                alt={currentRecord.user.name}
                title={currentRecord.user.name}
              />
            </Flex>

            <Box sx={{ flex: 1, mx: 2 }}>
              <Text
                as="span"
                sx={{
                  color: 'muted',
                  display: 'block',
                  fontSize: 0,
                  m: 0,
                  textTransform: 'uppercase',
                }}
              >
                Now Playing
              </Text>

              <Text
                as="span"
                sx={{
                  color: 'text',
                  display: 'block',
                  fontSize: 2,
                  m: 0,
                  minWidth: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {currentRecord.song.name}
              </Text>
            </Box>
          </Flex>

          <Flex
            sx={{
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Box
              onClick={selectUserPlaylist}
              id="playlist"
              sx={{
                alignItems: 'center',
                bg: 'background',
                borderRadius: 6,
                color: 'muted',
                cursor: 'pointer',
                display: ['flex', 'none'],
                p: 2,
                mx: 1,
                '&:hover': {
                  bg: 'primaryHover',
                  color: 'primary',
                },
              }}
            >
              <List size={20} />
            </Box>

            <Box
              onClick={selectRoomPlaylist}
              id="queue"
              sx={{
                alignItems: 'center',
                bg: 'background',
                borderRadius: 6,
                color: 'muted',
                cursor: 'pointer',
                display: 'flex',
                p: 2,
                mx: 1,
                '&:hover': {
                  bg: 'primaryHover',
                  color: 'primary',
                },
              }}
            >
              <Radio size={20} />
            </Box>

            <Box
              onClick={selectRoomHistory}
              id="history"
              sx={{
                alignItems: 'center',
                bg: 'background',
                borderRadius: 6,
                color: 'muted',
                cursor: 'pointer',
                display: 'flex',
                p: 2,
                mx: 1,
                '&:hover': {
                  bg: 'primaryHover',
                  color: 'primary',
                },
              }}
            >
              <Clock size={20} />
            </Box>
          </Flex>
        </Flex>
      </Box>

      <Box
        sx={{
          bg: 'accentHover',
          borderRadius: 6,
          display: ['none', 'block'],
          px: 3,
          mb: 3,
          height: '100%',
          overflowY: 'scroll',
        }}
      >
        <Flex
          sx={{
            alignItems: 'center',
            borderBottom: '1px solid',
            borderColor: 'accent',
            py: 3,
            mb: 3,
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              color: 'muted',
              display: 'flex',
              px: 2,
            }}
          >
            <List size={20} />
          </Box>
          <Text
            sx={{
              color: 'text',
              fontSize: 1,
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            Manage Your Playlist
          </Text>
        </Flex>

        <Box
          sx={{
            minHeight: 'auto',
            overflowY: 'scroll',
          }}
        >
          <UserPlaylist />
        </Box>
      </Box>

      <Modal showModal={showModal} closeModal={closeModal} title={tab} scroll={true}>
        <Component />
      </Modal>
    </>
  )
}
