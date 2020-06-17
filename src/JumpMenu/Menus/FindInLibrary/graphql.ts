import gql from 'graphql-tag'

// Queries & Mutations
export const LIBRARY_RECORDS_QUERY = gql`
  query JumpMenuLibraryRecords($query: String, $tagIds: [ID!]) {
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
    query?: string
    tagIds?: string[]
  }
}

// Entities
export type LibraryRecord = {
  __typename: 'LibraryRecord'
  id: string
  song: Song
}

export type Song = {
  __typename: 'Song'
  id: string
  durationInSeconds: number
  name: string
  youtubeId: string
  thumbnailUrl: string
}
