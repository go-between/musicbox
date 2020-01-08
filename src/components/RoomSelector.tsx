import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import { RoomType } from '../lib/apiTypes'
type RoomProps = Pick<RoomType, 'id' | 'name'>

const ROOMS_QUERY = gql`
  query RoomsQuery {
    rooms {
      id
      name
    }
  }
`

type RoomsQuery = {
  rooms: RoomProps[]
}

const ROOM_ACTIVATE = gql`
  mutation RoomActivate($roomId: ID!) {
    roomActivate(input: { roomId: $roomId }) {
      errors
    }
  }
`

const Room: React.FC<RoomProps & { active: boolean }> = ({ id, name, active }) => {
  const { push } = useHistory()
  const onClick = (): ReturnType<typeof push> => push(`/room/${id}`)

  return (
    <li>
      {name} {active && "(currently active)"}
      <button onClick={onClick}>Join</button>
    </li>
  )
}

type Props = {
  activeRoom?: string
}
const RoomSelector: React.FC<Props> = ({ activeRoom }) => {
  const { loading, error, data } = useQuery<RoomsQuery>(ROOMS_QUERY)

  if (loading) {
    return <p>Loading</p>
  }

  if (!data || error) {
    return <p>Error</p>
  }

  return (
    <ul>
      {data.rooms.map(r => (
        <Room key={r.id} active={r.id === activeRoom} {...r} />
      ))}
    </ul>
  )
}

export default RoomSelector
