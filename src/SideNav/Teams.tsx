import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Box, Flex, Heading, Text } from 'rebass'
import { Select } from '@rebass/forms'
import { PlusCircle } from 'react-feather'

import { useUserContext, useWebsocketContext, User } from 'Context'
import { CreateRoom } from './CreateRoom'

import { Modal } from 'components'
import { TeamActivate, TEAM_ACTIVATE } from './graphql'
import { RoomDetails } from './RoomDetails'

type TeamSelectorProps = {
  activeTeamId: string
  changeTeam: (ev: React.ChangeEvent<HTMLSelectElement>) => void
  teams: User['teams']
}
const TeamSelector: React.FC<TeamSelectorProps> = ({ activeTeamId, changeTeam, teams }) => {
  if (teams.length === 1) {
    return (
      <Heading
        sx={{
          mb: 4,
        }}
      >
        {teams[0].name}
      </Heading>
    )
  }

  const options = teams.map(t => (
    <Box as="option" key={t.id} value={t.id} sx={{minWidth: '0',}}>
      {t.name}
    </Box>
  ))

  return (
    <Box
      sx={{
        mb: 4,
      }}
    >
      <Select
        onChange={changeTeam}
        defaultValue={activeTeamId}
        sx={{
          bg: 'background',
          borderRadius: 4,
          borderColor: 'transparent',
          cursor: 'pointer',
          fontSize: 2,
          px: 1,
          py: 2,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          '&:hover': {
            bg: 'accent',
            borderRadius: 4,
          },
        }}
      >
        {options}
      </Select>
    </Box>
  )
}

type RoomSelectorProps = {
  activeRoomId?: string
  activeTeamId?: string
  initialRooms: User['activeTeam']['rooms']
}

const RoomSelector: React.FC<RoomSelectorProps> = ({ activeTeamId, activeRoomId, initialRooms }) => {
  const [rooms, setRooms] = useState<User['activeTeam']['rooms']>([])
  const websocket = useWebsocketContext()

  useEffect(() => {
    websocket.subscribeForTeam()
    websocket.subscribeToTeam(team => setRooms(team.rooms.sort((a, b) => (a.name > b.name ? 1 : -1))))

    return websocket.unsubscribeForTeam
  }, [activeTeamId, websocket])

  useEffect(() => {
    setRooms(initialRooms.sort((a, b) => (a.name > b.name ? 1 : -1)))
  }, [initialRooms])

  if (!rooms) {
    return <p>Loading</p>
  }

  const roomItems = rooms.map(r => {
    return (
      <RoomDetails
        key={r.id}
        activeRoomId={activeRoomId}
        room={r}
      />
    )
  })

  return (
    <Box as="ul" sx={{ listStyleType: 'none', m: 0, p: 0,}}>
      {roomItems}
    </Box>
  )
}

const Teams: React.FC = () => {
  const user = useUserContext()
  const [teamActivate] = useMutation<TeamActivate['data'], TeamActivate['vars']>(TEAM_ACTIVATE, {
    refetchQueries: ['UserQuery'],
  })
  const changeTeam = (ev: React.ChangeEvent<HTMLSelectElement>): void => {
    teamActivate({ variables: { teamId: ev.target.value } })
  }

  useEffect(() => {
    if (!!user.activeTeam) {
      return
    }

    teamActivate({ variables: { teamId: user.teams[0].id } })
  }, [teamActivate, user])

  if (!user.activeTeam) {
    return <p>Loading</p>
  }

  const [showModal, setShowModal] = useState(false)
  const openModal = (): void => setShowModal(true)
  const closeModal = (): void => setShowModal(false)

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Text
          sx={{
            color: 'gray500',
            fontSize: 2,
            fontWeight: '600',
            textTransform: 'uppercase'
          }}
        >
          Teams
        </Text>
      </Flex>

      <TeamSelector activeTeamId={user.activeTeam.id} changeTeam={changeTeam} teams={user.teams} />

      <Flex
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Text
          sx={{
            color: 'gray500',
            fontSize: 2,
            fontWeight: '600',
            textTransform: 'uppercase'
          }}
        >
          Rooms
        </Text>

        <Box
          as={PlusCircle}
          onClick={openModal}
          size={24}
          sx={{
            color: 'muted',
            cursor: 'pointer',
            mx: 1,
            width: '24px',
            '&:hover': {
              bg: 'muted',
              color: 'background',
              borderRadius: '100%'
            }
          }}
        />
      </Flex>

      <RoomSelector
        activeTeamId={user.activeTeam.id}
        activeRoomId={user.activeRoom?.id}
        initialRooms={user.activeTeam.rooms}
      />

      <Modal showModal={showModal} closeModal={closeModal} title="Create Room">
        <CreateRoom closeModal={closeModal} />
      </Modal>
    </>
  )
}

export default Teams
