import { RoomType } from 'lib/apiTypes'

// Channels
export const QUEUES_CHANNEL = 'QueuesChannel'
export const NOW_PLAYING_CHANNEL = 'NowPlayingChannel'
export const USERS_CHANNEL = 'UsersChannel'

export type Channel = typeof QUEUES_CHANNEL | typeof NOW_PLAYING_CHANNEL | typeof USERS_CHANNEL

export type Channels = {
  QUEUES_CHANNEL: typeof QUEUES_CHANNEL
  NOW_PLAYING_CHANNEL: typeof NOW_PLAYING_CHANNEL
  USERS_CHANNEL: typeof USERS_CHANNEL
}

export const channels: Channels = {
  QUEUES_CHANNEL,
  NOW_PLAYING_CHANNEL,
  USERS_CHANNEL,
}

type Ping = {
  identifier: undefined
  message: number
  type: 'ping'
}

// Message Types
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

export type DataMessage = WebsocketMessage<typeof USERS_CHANNEL, { room: RoomType }>

export type Message = SystemMessage | DataMessage

// Data
export type Subscriptions = {
  [QUEUES_CHANNEL]: {}
  [NOW_PLAYING_CHANNEL]: {}
  [USERS_CHANNEL]: {}
}

// Utilities
export type Options = { debug: boolean }
