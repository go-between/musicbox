import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Box, Flex, Heading, Text } from 'rebass'
import { Select } from '@rebass/forms'
import { useHistory } from 'react-router-dom'
import { Box as BoxIcon, PlusCircle, Speaker } from 'react-feather'

import { useUserContext, useWebsocketContext, User } from 'Context'
import { CreateRoom } from './CreateRoom'

import { Modal } from 'components'
import { TeamActivate, TEAM_ACTIVATE } from './graphql'

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
    <option key={t.id} value={t.id}>
      {t.name}
    </option>
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
          overflow: 'hidden',
          p: 0,
          pr: 4,
          textOverflow: 'ellipsis',
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
  const { push } = useHistory()
  const [rooms, setRooms] = useState<User['activeTeam']['rooms']>([])
  const navigateToRoom = (id: string): void => push(`/room/${id}`)
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
    const icon = r.currentSong ? (
      <Box display="inline-block" sx={{ position: 'relative', '&:hover > *': { visibility: 'visible' } }}>
        <Box sx={{ position: 'absolute', bg: 'accent', visibility: 'hidden', overflow: 'display' }}>
          {r.currentSong.name}
        </Box>
        <Speaker size={12} />
      </Box>
    ) : (
      <></>
    )
    return (
      <Box
        as="li"
        key={r.id}
        onClick={() => navigateToRoom(r.id)}
        sx={{
          alignItems: 'center',
          bg: activeRoomId === r.id ? 'accent' : 'initial',
          display: 'inline-flex',
          cursor: 'pointer',
          fontSize: 2,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          '&:hover': {
            bg: 'accent',
          },
        }}
      >
        <Box as={BoxIcon} size={[16, 20]} color='muted' mr={2} />
        {r.name}
      </Box>
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

      <TeamSelector activeTeamId={user.activeTeam.id} changeTeam={changeTeam} teams={user.teams} />

      <Flex
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Text
          sx={{
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
          size={18}
          sx={{
            color: 'muted',
            cursor: 'pointer',
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
