import gql from 'graphql-tag'

// Queries & Mutations
export type SongCreateMutation = {
  data: {
    songCreate: {
      song: Song
    }
  }
  vars: {
    youtubeId: string
  }
}
export const SONG_CREATE = gql`
  mutation SongCreateFromRoomHistory($youtubeId: ID!) {
    songCreate(input: { youtubeId: $youtubeId }) {
      song {
        id
        durationInSeconds
        name
        youtubeId
        thumbnailUrl
      }
      errors
    }
  }
`

export type RoomHistoryQuery = {
  data: {
    roomPlaylist: RoomPlaylistRecord[]
  }
  vars: {
    from: string
    roomId: string
  }
}
export const ROOM_HISTORY_QUERY = gql`
  query RoomHistoryQuery($roomId: ID!, $from: DateTime) {
    roomPlaylist(roomId: $roomId, historical: true, from: $from) {
      id
      playedAt
      song {
        id
        durationInSeconds
        name
        youtubeId
        thumbnailUrl
      }
      recordListens {
        id
        approval
        user {
          name
        }
      }
      user {
        id
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
  song: Song
  recordListens: RecordListen[]
  user: {
    id: string
    email: string
    name: string
  }
}

export type Song = {
  id: string
  durationInSeconds: number
  name: string
  youtubeId: string
  thumbnailUrl: string
}
