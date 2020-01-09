import React, { useContext, useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'

import { WebsocketContext } from 'App'
import { UserType } from 'lib/apiTypes'

const ROOM_ACTIVATE = gql`
  mutation RoomActivate($roomId: ID!) {
    roomActivate(input: { roomId: $roomId }) {
      errors
    }
  }
`

const Room: React.FC = () => {
  const { id } = useParams()
  const [active, setActive] = useState(false)
  const [users, setUsers] = useState<UserType[]>([])
  const [roomActivate] = useMutation(ROOM_ACTIVATE, { onCompleted: () => setActive(true) })
  const websocket = useContext(WebsocketContext)

  useEffect(() => {
    roomActivate({ variables: { roomId: id } })
  }, [id, roomActivate])

  useEffect(() => {
    if (!active || !websocket) {
      return
    }

    return websocket.subscribeToUsers(room => setUsers(room.users))
  }, [active, websocket])

  return (
    <>
      <p>users</p>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.email}</li>
        ))}
      </ul>
    </>
  )
}

export default Room
