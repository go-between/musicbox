import gql from 'graphql-tag'

export type RoomPlaylistRecordAbandon = {
  data: {}
  vars: {
    message: string
  }
}

export const ROOM_PLAYLIST_RECORD_ABANDON = gql`
  mutation RoomPlaylistRecordAbandon {
    roomPlaylistRecordAbandon(input: {}) {
      errors
    }
  }
`
