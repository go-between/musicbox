import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { USER_QUERY, UserQuery } from './graphql'
import RoomSelector from './RoomSelector'
import TeamSelector from './TeamSelector'

const Home: React.FC = () => {
  const { loading, error, data } = useQuery<UserQuery['data']>(USER_QUERY)

  if (loading) {
    return <p>Loading</p>
  }

  if (!data || error) {
    return <p>Error</p>
  }

  return (
    <>
      <p>Your Teams</p>
      <TeamSelector teams={data.user.teams} activeTeam={data.user.activeTeam?.id} />
      <p>
        Rooms for team: <i>{data.user.activeTeam?.name}</i>
      </p>
      {data.user.activeTeam?.id && <RoomSelector activeRoom={data.user.activeRoom?.id} />}
    </>
  )
}

export default Home
