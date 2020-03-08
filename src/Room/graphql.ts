import gql from 'graphql-tag'

// Queries & Mutations
export type MessagesQuery = {
  data: {
    messages: Message[]
  }
  vars: {
    from: string
  }
}

export const MESSAGES_QUERY = gql`
  query Messages($from: DateTime) {
    messages(from: $from) {
      id
      createdAt
      message
      song {
        name
      }
      user {
        email
        name
      }
    }
  }
`

export type MessageCreate = {
  data: {}
  vars: {
    message: string
  }
}

export const MESSAGE_CREATE = gql`
  mutation MessageCreate($message: String!) {
    messageCreate(input: { message: $message }) {
      errors
    }
  }
`

export type RoomActivate = {
  data: {
    roomActivate: {
      room: Room
    }
  }
  vars: {
    roomId: string
  }
}
export const ROOM_ACTIVATE = gql`
  mutation RoomActivate($roomId: ID!) {
    roomActivate(input: { roomId: $roomId }) {
      room {
        id
        currentRecord {
          playedAt
          song {
            name
            youtubeId
          }
          user {
            name
            email
          }
        }
        name
        users {
          id
          name
          email
        }
      }
      errors
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

// Entities
export type Message = {
  id: string
  createdAt: string
  message: string
  song: {
    name: string
  } | null
  user: {
    email: string
    name: string
  }
}

export type OrderedRecord = {
  roomPlaylistRecordId?: string
  songId: string
}

export type Room = {
  id: string
  currentRecord: {
    playedAt: string
    song: {
      name: string
      youtubeId: string
    }
    user: {
      name: string
      email: string
    }
  }
  name: string
  users: User[]
}

export type RoomPlaylistRecord = {
  id: string
  song: {
    id: string
    name: string
  }
}

export type User = {
  id: string
  name: string
  email: string
}
