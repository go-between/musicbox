import React, { useContext, useEffect, useState } from 'react'

import { WebsocketContext } from 'App'
import { UserType } from 'lib/apiTypes'

type Props = {
  initialUsers: UserType[]
}
const Users: React.FC<Props> = ({ initialUsers }) => {
  const [users, setUsers] = useState<UserType[]>([])

  const websocket = useContext(WebsocketContext)

  useEffect(() => {
    if (!websocket) {
      return
    }

    return websocket.subscribeToUsers(room => {
      setUsers(room.users)
    })
  }, [websocket])

  useEffect(() => {
    setUsers(initialUsers)
  }, [initialUsers])

  return (
    <>
      <p>users</p>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name} ({u.email} {u.id})
          </li>
        ))}
      </ul>
    </>
  )
}

export default Users
