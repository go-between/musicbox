import gql from 'graphql-tag'

// Queries & Mutations
export type RoomPlaylistForUserQuery = {
  data: {
    roomPlaylistForUser: RoomPlaylistRecord[]
  }
  vars: {}
}
export const ROOM_PLAYLIST_FOR_USER_QUERY = gql`
  query RoomPlaylistForUser {
    roomPlaylistForUser(historical: false) {
      id
      song {
        id
        name
      }
    }
  }
`

export type RoomPlaylistRecordsReorderMutation = {
  data: {
    roomPlaylistRecordsReorder: {
      roomPlaylistRecords: RoomPlaylistRecord[]
    }
  }
  vars: {
    orderedRecords: OrderedRecord[]
  }
}
export const ROOM_PLAYLIST_RECORDS_REORDER = gql`
  mutation RoomPlaylistRecordsReorder($orderedRecords: [OrderedPlaylistRecordInputObject!]!) {
    roomPlaylistRecordsReorder(input: { orderedRecords: $orderedRecords }) {
      roomPlaylistRecords {
        id
        song {
          id
          name
        }
      }
      errors
    }
  }
`

export const SONGS_QUERY = gql`
  query SongsQuery {
    songs {
      id
      name
    }
  }
`
export type SongsQuery = {
  data: {
    songs: Song[]
  }
}

export type UserLibraryRecordDeleteMutation = {
  data: {}
  vars: {
    id: string
  }
}
export const USER_LIBRARY_RECORD_DELETE_MUTATION = gql`
  mutation UserLibraryRecordDelete($id: ID!) {
    userLibraryRecordDelete(input: { id: $id }) {
      errors
    }
  }
`

// Entities
export type OrderedRecord = {
  roomPlaylistRecordId?: string
  songId: string
}

export type RoomPlaylistRecord = {
  id: string
  song: {
    id: string
    name: string
  }
}

export type Song = {
  id: string
  name: string
}
