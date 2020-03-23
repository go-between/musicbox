import gql from 'graphql-tag'

// Queries & Mutations
export type SongCreateMutation = {
  data: {
    songCreate: {
      song: {
        id: string
      }
    }
  }
  vars: {
    youtubeId: string
  }
}
export const SONG_CREATE = gql`
  mutation SongCreate($youtubeId: ID!) {
    songCreate(input: { youtubeId: $youtubeId }) {
      song {
        id
      }
      errors
    }
  }
`
export const SONGS_QUERY = gql`
  query SongsQuery($query: String) {
    songs(query: $query) {
      id
      name
      youtubeId
    }
  }
`
export type SongsQuery = {
  data: {
    songs: Song[]
  }
  vars: {
    query: string
  }
}

// Entities
export type OrderedRecord = {
  roomPlaylistRecordId?: string
  songId: string
}

export type RoomPlaylistRecord = {
  id: string
  song: {
    id: string
    name: string
  }
}

export type Song = {
  id: string
  name: string
}
