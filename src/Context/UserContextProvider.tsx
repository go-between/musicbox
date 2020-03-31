import React, { createContext, useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

type Team = {
  id: string
  name: string
}

type User = {
  id: string
  email: string
  name: string
  activeRoom: {
    id: string
  }
  activeTeam: {
    id: string
    name: string
    rooms: Array<{ id: string; name: string }>
  }
  teams: Team[]
}
type UserQuery = {
  data: {
    user: User
  }
  vars: {}
}
const USER_QUERY = gql`
  query UserQuery {
    user {
      id
      email
      name
      activeRoom {
        id
      }
      activeTeam {
        id
        name
        rooms {
          id
          name
        }
      }
      teams {
        id
        name
      }
    }
  }
`

const UserContext = createContext<User | null>(null)
const UserContextProvider: React.FC = ({ children }) => {
  const { loading, data } = useQuery<UserQuery['data']>(USER_QUERY, { fetchPolicy: 'network-only' })

  if (!data || loading) {
    return <p>Loading...</p>
  }

  return <UserContext.Provider value={data.user}>{children}</UserContext.Provider>
}

export const useUserContext: () => User = () => {
  const user = useContext(UserContext)

  if (user === null) {
    throw new Error('User accessed before context resolved')
  }

  return user
}
export default UserContextProvider
