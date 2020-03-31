import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Box, Heading } from 'rebass'
import { Select } from '@rebass/forms'
import { useHistory } from 'react-router-dom'

import { useUserContext } from 'Context'

import { TeamActivate, TEAM_ACTIVATE } from './graphql'

type TeamSelectorProps = {
  activeTeamId: string
  changeTeam: (ev: React.ChangeEvent<HTMLSelectElement>) => void
  teams: Array<{ id: string; name: string }>
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
  rooms?: Array<{ id: string; name: string }>
}

const RoomSelector: React.FC<RoomSelectorProps> = ({ activeRoomId, rooms }) => {
  const { push } = useHistory()
  const navigateToRoom = (id: string): void => push(`/room/${id}`)

  if (!rooms) {
    return <p>Loading</p>
  }

  const roomItems = rooms.map(r => (
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
      {r.name}
    </Box>
  ))

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
      <RoomSelector activeRoomId={user.activeRoom?.id} rooms={user.activeTeam.rooms} />
    </>
  )
}

export default Teams
