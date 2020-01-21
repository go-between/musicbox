import React from 'react'
import { useMutation } from '@apollo/react-hooks'

import { TEAM_ACTIVATE } from './graphql'

type TeamProps = {
  active: boolean
  id: string
  name: string
}
const Team: React.FC<TeamProps> = ({ id, name, active }) => {
  const [teamActivate] = useMutation(TEAM_ACTIVATE)

  if (active) {
    return (
      <li>
        <b>{name}</b>
      </li>
    )
  }

  const onClick = (): ReturnType<typeof teamActivate> =>
    teamActivate({ variables: { teamId: id }, refetchQueries: ['UserQuery', 'RoomsQuery'] })
  return (
    <li>
      {name}
      <button onClick={onClick}>Activate</button>
    </li>
  )
}

type Props = {
  teams: Array<{ id: string; name: string }>
  activeTeam?: string
}
const TeamSelector: React.FC<Props> = ({ teams, activeTeam }) => {
  return (
    <ul>
      {teams.map(t => (
        <Team key={t.id} id={t.id} name={t.name} active={t.id === activeTeam} />
      ))}
    </ul>
  )
}

export default TeamSelector
