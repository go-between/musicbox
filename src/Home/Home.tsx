import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import RoomSelector from './RoomSelector'
import TeamSelector from './TeamSelector'

import { UserType } from 'lib/apiTypes'

type UserQuery = {
  user: UserType
}
const USER_QUERY = gql`
  query UserQuery {
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

  return (
    <>
      <TeamSelector teams={data.user.teams} activeTeam={data.user.activeTeam?.id} />
      {data.user.activeTeam?.id && <RoomSelector activeRoom={data.user.activeRoom?.id} />}
    </>
  )
}

export default Home
