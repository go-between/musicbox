import gql from 'graphql-tag'

export type RecommendationCreate = {
  data: {}
  vars: {
    youtubeId: string
    recommendToUser: string
  }
}

export const RECOMMENDATION_CREATE = gql`
  mutation RecommendationCreate($youtubeId: ID!, $recommendToUser: ID!) {
    recommendationCreate(input: { youtubeId: $youtubeId, recommendToUser: $recommendToUser }) {
      errors
    }
  }
`

export type RecommendationsQuery = {
  data: {
    recommendations: Recommendation[]
  }
  vars: {
    songId: string
  }
}

export const RECOMMENDATIONS_QUERY = gql`
  query RecommendedToQuery($songId: ID) {
    recommendations(songId: $songId) {
      id
      source
      user {
        id
        name
        email
      }
    }
  }
`

export type LibraryRecordQuery = {
  data: {
    libraryRecord: {
      song: Song
      tags: Tag[]
    }
  }
  vars: {
    id: string
  }
}

export const LIBRARY_RECORD_QUERY = gql`
  query LibraryRecord($id: ID!) {
    libraryRecord(id: $id) {
      song {
        id
        durationInSeconds
        name
        youtubeId
      }
      tags {
        id
        name
      }
    }
  }
`

export type TeamQuery = {
  data: {
    team: {
      users: User[]
    }
  }
  vars: {
    id: string
  }
}

export const TEAM_QUERY = gql`
  query Team($id: ID!) {
    team(id: $id) {
      users {
        id
        name
      }
    }
  }
`

export type Recommendation = {
  id: string
  source: string
  user: {
    id: string
    name: string
    email: string
  }
}

export type Song = {
  id: string
  durationInSeconds: number
  name: string
  thumbnailUrl: string
  youtubeId: string
}

export type Tag = {
  id: string
  name: string
}

export type User = {
  id: string
  name: string
}
