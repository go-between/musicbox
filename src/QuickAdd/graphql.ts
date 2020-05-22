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
export const SEARCH_QUERY = gql`
  query Search($query: String!) {
    search(query: $query) {
      __typename
      ... on LibraryRecord {
        id
        song {
          id
          durationInSeconds
          name
          youtubeId
          thumbnailUrl
        }
      }
      ... on Song {
        id
        durationInSeconds
        name
        youtubeId
        thumbnailUrl
      }
      ... on YoutubeResult {
        id
        description
        duration
        title
        thumbnailUrl
      }
    }
  }
`

export type SearchQuery = {
  data: {
    search: SearchResult[]
  }
  vars: {
    query: string
  }
}

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
export type SearchResult = LibraryRecord | Song | YoutubeResult

export type LibraryRecord = {
  __typename: 'LibraryRecord'
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
  __typename: 'Song'
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

export type YoutubeResult = {
  __typename: 'YoutubeResult'
  id: string
  description: string
  duration: number
  title: string
  thumbnailUrl: string
}
