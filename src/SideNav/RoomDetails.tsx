import React, { useState } from 'react'
import { Box } from 'rebass'
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
          bg: activeRoomId === room.id ? 'accent' : 'initial',
          boxShadow: activeRoomId === room.id ? 'inset 4px 0 0 #5A67D8' : 'none',
          display: 'flex',
          color: activeRoomId === room.id ? '#7F9CF5' : 'text',
          cursor: 'pointer',
          fontSize: 2,
          fontWeight: activeRoomId === room.id ? '600' : '400',
          px: 3,
          py: 2,
          mb: 2,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          '&:hover': {
            bg: 'accent',
          },
        }}
      >
        <Box
          onClick={openModal}
          as={Grid}
          size={20}
          sx={{
            color: activeRoomId === room.id ? '#7F9CF5' : 'muted',
            mr: 2,
            width: '20px',
          }}
        />

        <Box
          onClick={() => navigateToRoom(room.id)}
          sx={{
            minWidth: '0',
            overflow: 'hidden',
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
