import React, { useState } from 'react'
import { Box, Flex, Link} from 'rebass'
import { useHistory } from 'react-router-dom'
import Gravatar from 'react-gravatar'
import { Grid } from 'react-feather'

import { User } from 'Context'

import { Modal } from 'components'

type RoomDetailsProps = {
  activeRoomId?: string
  room: User['activeTeam']['rooms'][0]
}

export const RoomDetails: React.FC<RoomDetailsProps> = ({ activeRoomId, room }) => {
  const { push } = useHistory()
  const navigateToRoom = (id: string): void => push(`/room/${id}`)
  const [showModal, setShowModal] = useState(false)
  const openModal = (): void => setShowModal(true)
  const closeModal = (): void => setShowModal(false)

  const activeUsers = room.users.map(user => {
    return (
      <li key={user.id}>
        <Gravatar email={user.email} size={24} style={{ borderRadius: '100%' }} />
        {user.name}
      </li>
    )
  })

  return (
    <>
      <Box
        as="li"
        sx={{
          alignItems: 'center',
          // bg: activeRoomId === room.id ? 'primaryHover' : 'initial',
          // boxShadow: activeRoomId === room.id ? 'inset -4px 0 0 #5A67D8' : 'none',
          color: activeRoomId === room.id ? 'primary' : 'text',
          cursor: 'pointer',
          display: 'flex',
          fontSize: 2,
          justifyContent: 'space-between',
          mb: 2,
          px: 2,
          py: 1,
          width: '100%',
          '&:hover': {
            bg: 'primaryHover',
            borderRadius: 6,
            boxShadow: 'none',
          },
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            color: activeRoomId === room.id ? 'primary' : 'muted',
            mr: 2,

          }}
        >
          <Grid size={20} />
        </Box>

        <Box
          as='span'
          onClick={() => navigateToRoom(room.id)}
          sx={{
            display: 'inline',
            flex: 1,
            minWidth: '0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {room.name}
        </Box>
      </Box>

      <Modal showModal={showModal} closeModal={closeModal} title="Room Details">
        <Box
          sx={{
            py: 4,
            mb: 3,
          }}
        >
          {room.currentSong ? room.currentSong?.name : 'No Song Currently Playing'}
        </Box>
        {room.users.length ? activeUsers : <Box>There are no Users in this room</Box>}
      </Modal>
    </>
  )
}
