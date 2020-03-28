import React from 'react'
import { Box, Heading } from 'rebass'
import { Cast, Users } from 'react-feather'

import { Container } from 'components'
import { useUserContext } from 'Context'

import RoomSelector from './RoomSelector'
import TeamSelector from './TeamSelector'

const Home: React.FC = () => {
  const user = useUserContext()

  return (
    <Container>
      <Box mt={4}>
        <Heading as="h2" mb={3} fontSize={[4, 6]}>
          <Users />
          Your Teams
        </Heading>
      </Box>

      <TeamSelector teams={user.teams} activeTeam={user.activeTeam?.id} />

      <Heading as="h2" mb={3} fontSize={[4, 6]}>
        <Cast />
        Available Rooms
      </Heading>
      {user.activeTeam?.id && <RoomSelector activeRoom={user.activeRoom?.id} />}
    </Container>
  )
}

export default Home
