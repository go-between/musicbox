import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import TeamSelector from './components/TeamSelector'

type UserQuery = {
  user: {
    id: string
    email: string
    name: string
    activeRoom: {
      id: string
    } | null
    activeTeam: {
      id: string
    } | null
    teams: Array<{ id: string; name: string }>
  }
}
const USER_QUERY = gql`
  query userQuery {
    user {
      id
      email
      name
      activeRoom {
        id
      }
      activeTeam {
        id
      }
      teams {
        id
        name
      }
    }
  }
`

const Home: React.FC = () => {
  const { loading, error, data } = useQuery<UserQuery>(USER_QUERY)

  if (loading) {
    return <p>Loading</p>
  }

  if (!data || error) {
    return <p>Error</p>
  }

  return <TeamSelector teams={data.user.teams} activeTeam={data.user.activeTeam?.id} />
}

export default Home
