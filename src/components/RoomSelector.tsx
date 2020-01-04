import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

const ROOMS_QUERY = gql`
  query RoomsQuery {
    rooms {
      id
      name
    }
  }
`

type Room = {
  id: string
  name: string
}
type RoomsQuery = {
  rooms: Room[]
}

const ROOM_ACTIVATE = gql`
  mutation RoomActivate($roomId: ID!) {
    roomActivate(input: { roomId: $roomId }) {
      errors
    }
  }
`

const Room: React.FC<Room & { active: boolean }> = ({ id, name, active }) => {
  const history = useHistory()
  const [roomActivate] = useMutation(ROOM_ACTIVATE, { onCompleted: () => history.push('/room') })

  if (active) {
    return (
      <li>
        <b>{name}</b> (currently active)
      </li>
    )
  }

  const onClick = (): ReturnType<typeof roomActivate> => roomActivate({ variables: { roomId: id } })

  return (
    <li>
      {name} (currently active)
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
