import gql from 'graphql-tag'

// Queries & Mutations
export type RoomHistoryQuery = {
  data: {
    roomPlaylist: RoomPlaylistRecord[]
  }
  vars: {
    roomId: string
  }
}
export const ROOM_HISTORY_QUERY = gql`
  query RoomHistory($roomId: ID!) {
    roomPlaylist(roomId: $roomId, historical: true) {
      id
      playedAt
      song {
        id
        name
      }
      recordListens {
        id
        approval
        user {
          name
        }
      }
      user {
        email
        name
      }
    }
  }
`

// Entities
type RecordListen = {
  id: string
  approval: number
  user: {
    name: string
  }
}
export type RoomPlaylistRecord = {
  id: string
  playedAt: string
  song: {
    id: string
    name: string
  }
  recordListens: RecordListen[]
  user: {
    email: string
    name: string
  }
}
