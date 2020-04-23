import gql from 'graphql-tag'

export type RoomPlaylistQuery = {
  data: {
    roomPlaylist: PlaylistRecord[]
  }
  vars: {
    roomId: string
  }
}
export const ROOM_PLAYLIST_QUERY = gql`
  query RoomPlaylist($roomId: ID!) {
    roomPlaylist(roomId: $roomId) {
      id
      song {
        id
        durationInSeconds
        name
        thumbnailUrl
      }
      user {
        id
        email
        name
      }
    }
  }
`

export type RoomPlaylistRecordsReorderMutation = {
  data: {
    roomPlaylistRecordsReorder: {}
  }
  vars: {
    orderedRecords: OrderedRecord[]
  }
}

export const ROOM_PLAYLIST_RECORDS_REORDER = gql`
  mutation RoomPlaylistRecordsReorder($orderedRecords: [OrderedPlaylistRecordInputObject!]!) {
    roomPlaylistRecordsReorder(input: { orderedRecords: $orderedRecords }) {
      errors
    }
  }
`

export type PlaylistRecord = {
  id: string
  order: number
  playedAt: string
  song: {
    id: string
    durationInSeconds: number
    name: string
    thumbnailUrl: string
    youtubeId: string
  }
  user: {
    id: string
    name: string
    email: string
  }
}

export type OrderedRecord = {
  roomPlaylistRecordId?: string
  songId: string
}
