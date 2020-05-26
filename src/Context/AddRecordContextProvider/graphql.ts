import gql from 'graphql-tag'

export type RoomPlaylistRecordsAdd = {
  data: {
    roomPlaylistRecordsAdd: {
      errors: string[]
    }
  }
  vars: {
    ids: string[]
  }
}

export const ROOM_PLAYLIST_RECORDS_ADD = gql`
  mutation RoomPlaylistRecordsAdd($ids: [ID!]!) {
    roomPlaylistRecordsAdd(input: { ids: $ids }) {
      errors
    }
  }
`

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

export type Song = {
  id: string
  durationInSeconds: number
  name: string
  youtubeId: string
  thumbnailUrl: string
}
