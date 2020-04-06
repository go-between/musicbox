import React, { useState } from 'react'
import { Box } from 'rebass'
import { useHistory } from 'react-router-dom'
import Gravatar from 'react-gravatar'

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
          bg: activeRoomId === room.id ? 'accent' : 'initial',
          borderRadius: 4,
          display: 'flex',
          cursor: 'pointer',
          fontSize: 2,
          px: 1,
          py: 2,
          mb: 2,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          '&:hover': {
            bg: 'accent',
            borderRadius: 4,
          },
        }}
      >
        <Box
          onClick={openModal}
          sx={{
            alignItems: 'center',
            bg: 'secondary',
            borderRadius: '6px',
            color: 'text',
            fontSize: 1,
            display: 'flex',
            height: '24px',
            justifyContent: 'center',
            mr: 2,
            p: 1,
            width: '24px',
          }}
        >
          {room.users.length}
        </Box>

        <Box
          onClick={() => navigateToRoom(room.id)}
          sx={{
            minWidth: '0',
            overflow: 'hidden',
            px: 1,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '100%',
          }}
        >
          {room.name}
        </Box>
      </Box>

      <Modal showModal={showModal} closeModal={closeModal} title="Room Details">
        <Box
          sx={{
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
