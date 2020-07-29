import gql from 'graphql-tag'

// Queries & Mutations
export const SEARCH_QUERY = gql`
  query Search($query: String!) {
    search(query: $query) {
      __typename
      ... on Song {
        id
        name
        youtubeId
        thumbnailUrl
      }
      ... on YoutubeResult {
        id
        description
        name
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

// Entities
export type SearchResult = Song | YoutubeResult

export type Song = {
  __typename: 'Song'
  id: string
  durationInSeconds: number
  name: string
  youtubeId: string
  thumbnailUrl: string
}

export type YoutubeResult = {
  __typename: 'YoutubeResult'
  id: string
  description: string
  duration: number
  name: string
  thumbnailUrl: string
}
