import gql from 'graphql-tag'

// Queries & Mutations

export type RoomsQuery = {
  data: {
    rooms: Room[]
  }
  vars: {}
}

export const ROOMS_QUERY = gql`
  query RoomsQuery {
    rooms {
      id
      name
    }
  }
`

export const TEAM_ACTIVATE = gql`
  mutation TeamActivate($teamId: ID!) {
    teamActivate(input: { teamId: $teamId }) {
      errors
    }
  }
`

export type UserQuery = {
  data: {
    user: User
  }
  vars: {}
}
export const USER_QUERY = gql`
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
      }
      teams {
        id
        name
      }
    }
  }
`

// Entities
type Room = {
  id: string
  name: string
}

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
  }
  teams: Team[]
}
