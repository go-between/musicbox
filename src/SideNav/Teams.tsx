import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Box, Heading } from 'rebass'
import { Select } from '@rebass/forms'
import { useHistory } from 'react-router-dom'
import { Speaker } from 'react-feather'

import { useUserContext, useWebsocketContext, User } from 'Context'

import { TeamActivate, TEAM_ACTIVATE } from './graphql'

type TeamSelectorProps = {
  activeTeamId: string
  changeTeam: (ev: React.ChangeEvent<HTMLSelectElement>) => void
  teams: User['teams']
}
const TeamSelector: React.FC<TeamSelectorProps> = ({ activeTeamId, changeTeam, teams }) => {
  if (teams.length === 1) {
    return <Heading>{teams[0].name}</Heading>
  }

  const options = teams.map(t => (
    <option key={t.id} value={t.id}>
      {t.name}
    </option>
  ))

  return (
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
  )
}

type RoomSelectorProps = {
  activeRoomId?: string
  activeTeamId?: string
  initialRooms: User['activeTeam']['rooms']
}

const RoomSelector: React.FC<RoomSelectorProps> = ({ activeTeamId, activeRoomId, initialRooms }) => {
  const { push } = useHistory()
  const [rooms, setRooms] = useState<User['activeTeam']['rooms']>(
    initialRooms.sort((a, b) => (a.name > b.name ? 1 : -1)),
  )
  const navigateToRoom = (id: string): void => push(`/room/${id}`)
  const websocket = useWebsocketContext()

  useEffect(() => {
    websocket.subscribeForTeam()
    websocket.subscribeToTeam(team => setRooms(team.rooms.sort((a, b) => (a.name > b.name ? 1 : -1))))

    return websocket.unsubscribeForTeam
  }, [activeTeamId, websocket])

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
          bg: activeRoomId === r.id ? 'accent' : 'initial',
          cursor: 'pointer',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          '&:hover': {
            bg: 'accent',
          },
        }}
      >
        {icon} {r.name}
      </Box>
    )
  })

  return (
    <Box as="ul" sx={{ listStyleType: 'none', pl: 2 }}>
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

  return (
    <>
      <TeamSelector activeTeamId={user.activeTeam.id} changeTeam={changeTeam} teams={user.teams} />
      <RoomSelector
        activeTeamId={user.activeTeam.id}
        activeRoomId={user.activeRoom?.id}
        initialRooms={user.activeTeam.rooms}
      />
    </>
  )
}

export default Teams
