import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

type Team = {
  id: string
  name: string
}

type Props = {
  teams: Array<{ id: string; name: string }>
  activeTeam?: string
}

const TEAM_ACTIVATE = gql`
  mutation TeamActivate($teamId: ID!) {
    teamActivate(input: { teamId: $teamId }) {
      errors
    }
  }
`

const Team: React.FC<Team & { active: boolean }> = ({ id, name, active }) => {
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
