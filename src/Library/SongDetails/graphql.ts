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
  query Recommendations($songId: ID) {
    recommendations(songId: $songId) {
      id
      source
      user {
        name
        email
      }
    }
  }
`

export type SongQuery = {
  data: {
    song: Song
  }
  vars: {
    id: string
  }
}

export const SONG_QUERY = gql`
  query Song($id: ID!) {
    song(id: $id) {
      id
      durationInSeconds
      name
      youtubeId
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
    name: string
    email: string
  }
}

export type Song = {
  id: string
  durationInSeconds: number
  name: string
  thumbnailUrl: string
  tags: Tag[]
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
