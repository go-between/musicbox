import gql from 'graphql-tag'

// Queries & Mutations
export type PinnedMessagesQuery = {
  data: {
    pinnedMessages: Message[]
  }
  vars: {
    songId: string
  }
}

export const PINNED_MESSAGES_QUERY = gql`
  query PinnedMessages($songId: ID!) {
    pinnedMessages(songId: $songId) {
      id
      createdAt
      message
      pinned
      song {
        name
      }
      user {
        id
        email
        name
      }
    }
  }
`

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
      pinned
      song {
        name
      }
      user {
        id
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

export type MessagePin = {
  data: {}
  vars: {
    messageId: string
    pin: boolean
  }
}

export const MESSAGE_PIN = gql`
  mutation MessagePin($messageId: ID!, $pin: Boolean!) {
    messagePin(input: { messageId: $messageId, pin: $pin }) {
      message {
        id
        pinned
      }
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
            id
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
  pinned: boolean
  song: {
    name: string
  } | null
  user: {
    id: string
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
      id: string
      name: string
      youtubeId: string
    }
    user: {
      name: string
      email: string
    }
  } | null
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
