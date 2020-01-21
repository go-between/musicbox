import gql from 'graphql-tag'

// Queries & Mutations
export const ROOM_ACTIVATE = gql`
  mutation RoomActivate($roomId: ID!) {
    roomActivate(input: { roomId: $roomId }) {
      errors
    }
  }
`

// Entities
export type User = {
  id: string
  name: string
  email: string
}

export type RoomsQuery = {
  data: {
    room: {
      currentRecord: {
        playedAt: string
        song: {
          name: string
          youtubeId: string
        }
      }
      name: string
      users: User[]
    }
  }
  vars: {
    id?: string
  }
}

export const ROOMS_QUERY = gql`
  query RoomsQuery($id: ID!) {
    room(id: $id) {
      currentRecord {
        playedAt
        song {
          name
          youtubeId
        }
      }
      name
      users {
        id
        name
        email
      }
    }
  }
`
