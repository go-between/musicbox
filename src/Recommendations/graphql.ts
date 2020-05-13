import gql from 'graphql-tag'

export type RecommendationsQuery = {
  data: {
    recommendations: Recommendation[]
  }
  vars: {}
}

export const RECOMMENDATIONS_QUERY = gql`
  query Recommendations {
    recommendations {
      id
      source
      song {
        id
        name
        thumbnailUrl
        youtubeId
      }
      fromUser {
        name
        email
      }
    }
  }
`

export type RecommendationAccept = {
  data: {}
  vars: {
    libraryRecordId: string
  }
}

export const RECOMMENDATION_ACCEPT = gql`
  mutation RecommendationAccept($libraryRecordId: ID!) {
    recommendationAccept(input: { libraryRecordId: $libraryRecordId }) {
      errors
    }
  }
`
export type RecommendatioReject = {
  data: {}
  vars: {
    id: string
  }
}

export const RECOMMENDATION_REJECT = gql`
  mutation UserLibraryRecordDelete($id: ID!) {
    userLibraryRecordDelete(input: { id: $id }) {
      errors
    }
  }
`

export type Recommendation = {
  id: string
  source: string
  song: {
    id: string
    name: string
    thumbnailUrl: string
    youtubeId: string
  }
  fromUser: {
    name: string
    email: string
  }
}
