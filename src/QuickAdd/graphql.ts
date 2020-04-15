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
  mutation SongCreate($youtubeId: ID!) {
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
export const SONGS_QUERY = gql`
  query SongsQuery($query: String, $tagIds: [ID!]) {
    songs(query: $query, tagIds: $tagIds) {
      id
      durationInSeconds
      name
      youtubeId
      thumbnailUrl
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
  durationInSeconds: number
  name: string
  youtubeId: string
  thumbnailUrl: string
}

export type Tag = {
  id: string
  name: string
}
