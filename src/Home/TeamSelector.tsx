import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Box, Button, Flex, Text } from 'rebass'

import { TEAM_ACTIVATE } from './graphql'
import { fontWeight } from 'styled-system'

type TeamProps = {
  active: boolean
  id: string
  name: string
}
const Team: React.FC<TeamProps> = ({ id, name, active }) => {
  const [teamActivate] = useMutation(TEAM_ACTIVATE)

  if (active) {
    return (
      <Box
        sx={{
          px: 3
        }}
      >
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'primary',
            borderRadius: 4,
            boxShadow: 'md',
            bg: 'indigo100',
            color: 'indigo800',
            p: 4,
          }}
        >
          <Text fontSize={3} fontWeight="bold">{name}</Text>
        </Box>
      </Box>
    )
  }

  const onClick = (): ReturnType<typeof teamActivate> =>
    teamActivate({ variables: { teamId: id }, refetchQueries: ['UserQuery', 'RoomsQuery'] })
  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        px: 3,
        py: [3,0],
      }}
    >
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'gray500',
          borderRadius: 4,
          boxShadow: 'base',
          bg: 'white',
          p: 4,
          '&:hover': {
            borderColor:'primary',
            boxShadow: 'md',
            bg: 'indigo100'
          }
        }}
      >
        <Text fontSize={3}>{name}</Text>
      </Box>
    </Box>
  )
}

type Props = {
  teams: Array<{ id: string; name: string }>
  activeTeam?: string
}
const TeamSelector: React.FC<Props> = ({ teams, activeTeam }) => {
  return (
    <Flex mx={-3} pb={4} flexDirection={['column', 'row']}>
      {teams.map(t => (
        <Team key={t.id} id={t.id} name={t.name} active={t.id === activeTeam} />
      ))}
    </Flex>
  )
}

export default TeamSelector
