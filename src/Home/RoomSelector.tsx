import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { Box, Button, Flex } from 'rebass'

import { ROOMS_QUERY, RoomsQuery } from './graphql'

type RoomProps = {
  active: boolean
  id: string
  name: string
}
const Room: React.FC<RoomProps> = ({ id, name, active }) => {
  const { push } = useHistory()
  const onClick = (): ReturnType<typeof push> => push(`/room/${id}`)

  return (
    <Flex
      as="li"
      alignItems="center"
      sx={{
        listStyle: 'none',
        py: 2,
      }}
    >
      {name} {active && '(currently active)'}
      <Button
        onClick={onClick}
        mx={2}
        px={2}
        py={1}
        fontSize={1}
      >
        Join
      </Button>
    </Flex>
  )
}

type Props = {
  activeRoom?: string
}
const RoomSelector: React.FC<Props> = ({ activeRoom }) => {
  const { loading, error, data } = useQuery<RoomsQuery['data']>(ROOMS_QUERY)

  if (loading) {
    return <p>Loading</p>
  }

  if (!data || error) {
    return <p>Error</p>
  }

  return (
    <Box
      as="ul"
      sx={{
        m: 0,
        p: 0,
      }}
    >
      {data.rooms.map(r => (
        <Room key={r.id} active={r.id === activeRoom} {...r} />
      ))}
    </Box>
  )
}

export default RoomSelector
