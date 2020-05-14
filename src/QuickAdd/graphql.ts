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
export const LIBRARY_RECORDS_QUERY = gql`
  query QuickAddLibraryRecordsQuery($query: String, $tagIds: [ID!]) {
    libraryRecords(query: $query, tagIds: $tagIds) {
      id
      song {
        id
        durationInSeconds
        name
        youtubeId
        thumbnailUrl
      }
    }
  }
`
export type LibraryRecordsQuery = {
  data: {
    libraryRecords: LibraryRecord[]
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
export type LibraryRecord = {
  id: string
  song: Song
}

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
