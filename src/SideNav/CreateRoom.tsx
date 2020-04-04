import React, { useState } from 'react'
import { RoomCreate, ROOM_CREATE } from './graphql'
import { useMutation } from '@apollo/react-hooks'
import { Box, Button, Flex } from 'rebass'
import { Input } from '@rebass/forms'

import { setString } from 'lib/setters'

type CreateRoomProps = {
  closeModal: () => void
}

export const CreateRoom: React.FC<CreateRoomProps> = ({ closeModal }) => {
  const [roomName, setRoomName] = useState('')
  const [roomCreateMutation] = useMutation<RoomCreate['vars'], RoomCreate['data']>(ROOM_CREATE, {
    refetchQueries: ['UserQuery'],
    onCompleted: (): void => {
      setRoomName('')
      closeModal()
    },
  })
  const createRoom = (): void => {
    roomCreateMutation({ variables: { name: roomName } })
  }

  return (
    <Box sx={{ textAlign: 'right' }}>
      <Input onChange={setString(setRoomName)} value={roomName} mb={2} />
      <Button onClick={createRoom} disabled={!roomName} sx={{ '&:disabled': { pointerEvents: 'none' } }}>
        Create
      </Button>
    </Box>
  )
}
