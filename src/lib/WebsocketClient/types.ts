// Channels
export const MESSAGE_CHANNEL = 'MessageChannel'
export const NOW_PLAYING_CHANNEL = 'NowPlayingChannel'
export const RECORD_LISTENS_CHANNEL = 'RecordListensChannel'
export const ROOM_PLAYLIST_CHANNEL = 'RoomPlaylistChannel'
export const TEAM_CHANNEL = 'TeamChannel'
export const USERS_CHANNEL = 'UsersChannel'

export type Channel =
  | typeof MESSAGE_CHANNEL
  | typeof NOW_PLAYING_CHANNEL
  | typeof RECORD_LISTENS_CHANNEL
  | typeof ROOM_PLAYLIST_CHANNEL
  | typeof TEAM_CHANNEL
  | typeof USERS_CHANNEL

export type Channels = {
  MESSAGE_CHANNEL: typeof MESSAGE_CHANNEL
  NOW_PLAYING_CHANNEL: typeof NOW_PLAYING_CHANNEL
  RECORD_LISTENS_CHANNEL: typeof RECORD_LISTENS_CHANNEL
  ROOM_PLAYLIST_CHANNEL: typeof ROOM_PLAYLIST_CHANNEL
  TEAM_CHANNEL: typeof TEAM_CHANNEL
  USERS_CHANNEL: typeof USERS_CHANNEL
}

export const channels: Channels = {
  MESSAGE_CHANNEL,
  NOW_PLAYING_CHANNEL,
  RECORD_LISTENS_CHANNEL,
  ROOM_PLAYLIST_CHANNEL,
  TEAM_CHANNEL,
  USERS_CHANNEL,
}

export type Subscriptions = {
  [MESSAGE_CHANNEL]: {}
  [NOW_PLAYING_CHANNEL]: {}
  [RECORD_LISTENS_CHANNEL]: {}
  [ROOM_PLAYLIST_CHANNEL]: {}
  [TEAM_CHANNEL]: {}
  [USERS_CHANNEL]: {}
}

// Message Types
type Ping = {
  identifier: undefined
  message: number
  type: 'ping'
}

type ConfirmSubscription = {
  identifier: { channel: Channel }
  type: 'confirm_subscription'
}

type RejectSubscription = {
  identifier: { channel: Channel }
  type: 'reject_subscription'
}

type SystemMessage = Ping | ConfirmSubscription | RejectSubscription

type WebsocketMessage<T, K> = {
  messageType: T
  identifier: {
    channel: T
  }
  message: {
    data: K
  }
  type: undefined
}

export type DataMessage =
  | WebsocketMessage<typeof MESSAGE_CHANNEL, MessageChannelMessage>
  | WebsocketMessage<typeof NOW_PLAYING_CHANNEL, NowPlayingChannelMessage>
  | WebsocketMessage<typeof RECORD_LISTENS_CHANNEL, RecordListensMessage>
  | WebsocketMessage<typeof ROOM_PLAYLIST_CHANNEL, RoomPlaylistMessage>
  | WebsocketMessage<typeof TEAM_CHANNEL, TeamMessage>
  | WebsocketMessage<typeof USERS_CHANNEL, UserChannelMessage>

export type Message = SystemMessage | DataMessage

// Message Data
export type MessageChannelMessage = {
  message: {
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
}

export type NowPlayingChannelMessage = {
  room: {
    currentRecord: {
      id: string
      playedAt: string
      song: {
        id: string
        name: string
        youtubeId: string
      }
      user: {
        id: string
        name: string
        email: string
      }
    } | null
  }
}

type RecordListen = {
  approval: number
  user: {
    id: string
  }
}

export type RecordListensMessage = {
  recordListens: RecordListen[]
}

type RecordForRoomPlaylist = {
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
    email: string
    name: string
  }
}

export type RoomPlaylistMessage = {
  roomPlaylist: RecordForRoomPlaylist[]
}

type RoomForTeamMessage = {
  id: string
  name: string
  currentSong: {
    name: string
  } | null
  users: Array<{
    id: string
    email: string
    name: string
  }>
}
export type TeamMessage = {
  team: {
    rooms: RoomForTeamMessage[]
  }
}

type UserForUserChannel = {
  id: string
  name: string
  email: string
}

export type UserChannelMessage = {
  room: {
    users: UserForUserChannel[]
  }
}
// Utilities
export type Options = { debug: boolean }
