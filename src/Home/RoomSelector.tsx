import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import { ROOMS_QUERY, RoomsQuery } from './graphql'

type Room = {
  id: string
  name: string
}

type RoomProps = Room & { active: boolean }
const Room: React.FC<RoomProps> = ({ id, name, active }) => {
  const { push } = useHistory()
  const onClick = (): ReturnType<typeof push> => push(`/room/${id}`)

  return (
    <li>
      {name} {active && '(currently active)'}
      <button onClick={onClick}>Join</button>
    </li>
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
    <ul>
      {data.rooms.map(r => (
        <Room key={r.id} active={r.id === activeRoom} {...r} />
      ))}
    </ul>
  )
}

export default RoomSelector
