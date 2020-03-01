import gql from 'graphql-tag'

// Queries & Mutations
export type RoomPlaylistForUserQuery = {
  data: {
    roomPlaylistForUser: RoomPlaylistRecord[]
  }
  vars: {}
}
export const ROOM_PLAYLIST_FOR_USER_QUERY = gql`
  query RoomPlaylistForUser {
    roomPlaylistForUser(historical: false) {
      id
      song {
        id
        name
      }
    }
  }
`

// Entities
export type RoomPlaylistRecord = {
  id: string
  song: {
    id: string
    name: string
  }
}
