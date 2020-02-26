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
      roomPlaylistRecord {
        song {
          name
        }
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
        currentRecord {
          playedAt
          song {
            name
            youtubeId
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
  roomPlaylistRecord: {
    song: {
      name: string
    }
  } | null
  user: {
    email: string
    name: string
  }
}
export type Room = {
  currentRecord: {
    playedAt: string
    song: {
      name: string
      youtubeId: string
    }
  }
  name: string
  users: User[]
}
export type User = {
  id: string
  name: string
  email: string
}
