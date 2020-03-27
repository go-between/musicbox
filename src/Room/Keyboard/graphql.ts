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
  mutation SongCreateFromKeyboard($youtubeId: ID!) {
    songCreate(input: { youtubeId: $youtubeId }) {
      song {
        id
        name
        youtubeId
      }
      errors
    }
  }
`

export type Song = {
  id: string
  name: string
  youtubeId: string
}
