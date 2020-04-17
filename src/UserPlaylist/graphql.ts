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
        durationInSeconds
        name
        thumbnailUrl
      }
    }
  }
`

// Entities
export type RoomPlaylistRecord = {
  id: string
  song: {
    id: string
    durationInSeconds: number
    name: string
    thumbnailUrl: string
  }
}
