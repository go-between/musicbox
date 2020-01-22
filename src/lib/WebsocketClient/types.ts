// Channels
export const ROOM_PLAYLIST_CHANNEL = 'RoomPlaylistChannel'
export const NOW_PLAYING_CHANNEL = 'NowPlayingChannel'
export const USERS_CHANNEL = 'UsersChannel'

export type Channel = typeof ROOM_PLAYLIST_CHANNEL | typeof NOW_PLAYING_CHANNEL | typeof USERS_CHANNEL

export type Channels = {
  ROOM_PLAYLIST_CHANNEL: typeof ROOM_PLAYLIST_CHANNEL
  NOW_PLAYING_CHANNEL: typeof NOW_PLAYING_CHANNEL
  USERS_CHANNEL: typeof USERS_CHANNEL
}

export const channels: Channels = {
  ROOM_PLAYLIST_CHANNEL,
  NOW_PLAYING_CHANNEL,
  USERS_CHANNEL,
}

export type Subscriptions = {
  [ROOM_PLAYLIST_CHANNEL]: {}
  [NOW_PLAYING_CHANNEL]: {}
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
  | WebsocketMessage<typeof NOW_PLAYING_CHANNEL, NowPlayingChannelMessage>
  | WebsocketMessage<typeof ROOM_PLAYLIST_CHANNEL, RoomPlaylistMessage>
  | WebsocketMessage<typeof USERS_CHANNEL, UserChannelMessage>

export type Message = SystemMessage | DataMessage

// Message Data
export type NowPlayingChannelMessage = {
  room: {
    currentRecord: {
      playedAt: string
      song: {
        name: string
        youtubeId: string
      }
    }
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

type RecordForRoomPlaylist = {
  id: string
  order: number
  song: {
    id: string
    name: string
  }
  user: {
    email: string
    name: string
  }
}

export type RoomPlaylistMessage = {
  roomPlaylist: RecordForRoomPlaylist[]
}
// Utilities
export type Options = { debug: boolean }
