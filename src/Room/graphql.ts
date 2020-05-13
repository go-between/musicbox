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
      roomPlaylistRecord {
        id
        playedAt
      }
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
      roomPlaylistRecord {
        id
        playedAt
      }
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
          id
          playedAt
          song {
            id
            durationInSeconds
            name
            thumbnailUrl
            youtubeId
          }
          user {
            id
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

// Entities
export type Message = {
  id: string
  createdAt: string
  message: string
  pinned: boolean
  roomPlaylistRecord: {
    id: string
    playedAt: string
  } | null
  song: {
    name: string
  } | null
  user: {
    id: string
    email: string
    name: string
  }
}

export type Room = {
  id: string
  currentRecord: {
    id: string
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
  } | null
  name: string
  users: User[]
}

export type User = {
  id: string
  name: string
  email: string
}
