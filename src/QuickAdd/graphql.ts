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
  query SongsQuery($query: String, $tagIds: [ID!]) {
    songs(query: $query, tagIds: $tagIds) {
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
    tagIds: string[]
  }
}

export type TagsQuery = {
  data: {
    tags: Tag[]
  }
  vars: {}
}

export const TAGS_QUERY = gql`
  query Tags {
    tags {
      id
      name
    }
  }
`

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
  youtubeId: string
}

export type Tag = {
  id: string
  name: string
}
