import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Box, Heading } from 'rebass'

import { USER_QUERY, UserQuery } from './graphql'
import RoomSelector from './RoomSelector'
import TeamSelector from './TeamSelector'
import { from } from 'apollo-boost'

import Container from '../components/Container'

const Home: React.FC = () => {
  const { loading, error, data } = useQuery<UserQuery['data']>(USER_QUERY)

  if (loading) {
    return <p>Loading</p>
  }

  if (!data || error) {
    return <p>Error</p>
  }

  return (
    <Container>
      <Box mt={4}>
        <Heading as="h2" mb={3} fontSize={[4, 6]}>
          Your Teams
        </Heading>
      </Box>

      <TeamSelector teams={data.user.teams} activeTeam={data.user.activeTeam?.id} />

      <Heading as="h2" mb={3} fontSize={[4, 6]}>
        Available Rooms
        {/* <i>{data.user.activeTeam?.name}</i> */}
      </Heading>
      {data.user.activeTeam?.id && <RoomSelector activeRoom={data.user.activeRoom?.id} />}
    </Container>
  )
}

export default Home
