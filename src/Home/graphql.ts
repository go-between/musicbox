import gql from 'graphql-tag'

// Queries & Mutations
export type RoomCreate = {
  data: {
    roomCreate: {
      room: Room
    }
  }
  vars: {
    name: string
  }
}

export const ROOM_CREATE = gql`
  mutation RoomCreate($name: String!) {
    roomCreate(input: { name: $name }) {
      room {
        id
        name
      }
      errors
    }
  }
`

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

// Entities
type Room = {
  id: string
  name: string
}
