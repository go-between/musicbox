import gql from 'graphql-tag'

// Queries & Mutations
export type RoomPlaylistQuery = {
  data: {
    roomPlaylist: RoomPlaylistRecord[]
  }
  vars: {
    roomId: string
  }
}
export const ROOM_PLAYLIST_QUERY = gql`
  query RoomPlaylist($roomId: ID!) {
    roomPlaylist(roomId: $roomId) {
      id
      song {
        id
        name
      }
      user {
        email
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
  user: {
    email: string
    name: string
  }
}
