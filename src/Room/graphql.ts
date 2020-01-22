import gql from 'graphql-tag'

// Queries & Mutations
export type RoomActivate = {
  data: {
    roomActivate: {
      room: Room
    }
  }
  vars: {
    roomId: string
  }
}
export const ROOM_ACTIVATE = gql`
  mutation RoomActivate($roomId: ID!) {
    roomActivate(input: { roomId: $roomId }) {
      room {
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
      errors
    }
  }
`

// Entities
export type Room = {
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
export type User = {
  id: string
  name: string
  email: string
}
