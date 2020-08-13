import React, {useState} from 'react'
import { Box, Flex, Text } from 'rebass'
import Gravatar from 'react-gravatar'
import { Clock, List, Radio, } from 'react-feather'

import { Modal } from 'components'
import { useCurrentRecordContext } from 'Context'
import RoomPlaylist from 'RoomPlaylist'
import RoomHistory from 'RoomHistory'
import UserPlaylist from 'UserPlaylist'

export const VideoDetails: React.FC = () => {
  const { currentRecord } = useCurrentRecordContext()
  const [showModal, setShowModal] = useState(false)
  const closeModal = (): void => setShowModal(false)

  type Tabs = 'userPlaylist' | 'roomPlaylist' | 'roomHistory'
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
    return (
      <></>
    )
  }

  return (
    <>
      <Flex
        sx={{
          alignItems: 'center',
          bg: 'accentHover',
          // border: '1px solid',
          // borderColor: 'accent',
          borderRadius: 6,
          justifyContent: 'space-between',
          px: 2,
          py: 2,
          my: 2,
          width: '100%',
        }}
      >
        <Flex
          sx={{
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Gravatar email={currentRecord.user.email} size={36} style={{ borderRadius: '100%', }} alt={currentRecord.user.name} title={currentRecord.user.name}/>

          <Box sx={{p: 2,}}>
            <Text
              as='span'
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
              as='span'
              sx={{
                color: 'text',
                display: 'block',
                fontSize: 2,
                m: 0,
                minWidth: 0,
                overflow: 'hidden',
                textAlign: 'center',
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
            justifyContent: 'flex-end'
          }}
        >
          <Box
            onClick={selectUserPlaylist}
            id='playlist'
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
                color: 'primary'
              }
            }}
          >
            <List size={20}/>
          </Box>

          <Box
            onClick={selectRoomPlaylist}
            id='queue'
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
                color: 'primary'
              }
            }}
          >
            <Radio size={20}/>
          </Box>

          <Box
            onClick={selectRoomHistory}
            id='history'
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
                color: 'primary'
              }
            }}
          >
            <Clock size={20}/>
          </Box>
        </Flex>
      </Flex>

      <Box
        sx={{
          bg: 'accentHover',
          borderRadius: 6,
          display: ['none', 'block'],
          p: 2,
        }}
      >
        <UserPlaylist />
      </Box>

      <Modal showModal={showModal} closeModal={closeModal} title={tab}>
        <Component />
      </Modal>
    </>
  )
}
