import gql from 'graphql-tag'

// Queries & Mutations
export type SongCreateMutation = {
  data: {}
  vars: {
    youtubeId: string
  }
}
export const SONG_CREATE = gql`
  mutation SongCreate($youtubeId: ID!) {
    songCreate(input: { youtubeId: $youtubeId }) {
      errors
    }
  }
`
