import {
  channels,
  DataMessage,
  Message,
  Options,
  MessageChannelMessage,
  NowPlayingChannelMessage,
  RecordListensMessage,
  RoomPlaylistMessage,
  Subscriptions,
  UserChannelMessage,
} from './types'

import { WEBSOCKET_HOST } from 'lib/constants'

export const awaitWebsocket = (token: string): Promise<WebSocket> => {
  return new Promise((resolve, reject) => {
    const formData = new URLSearchParams()
    formData.append('token', token)
    const socket = new WebSocket(`${WEBSOCKET_HOST}?${formData.toString()}`)

    socket.onopen = () => resolve(socket)
    socket.onerror = () => reject(socket)
  })
}

export class Client {
  private debug: boolean
  private websocket: WebSocket | null = null

  private messageMessages: Array<MessageChannelMessage['message']> = []
  private messageSubscription: ((message: MessageChannelMessage['message']) => void) | null = null

  private nowPlayingMessages: Array<NowPlayingChannelMessage['room']> = []
  private nowPlayingSubscription: ((currentRecord: NowPlayingChannelMessage['room']) => void) | null = null

  private recordListensMessages: Array<RecordListensMessage['recordListens']> = []
  private recordListensSubscription: ((recordListens: RecordListensMessage['recordListens']) => void) | null = null

  private roomPlaylistMessages: Array<RoomPlaylistMessage['roomPlaylist']> = []
  private roomPlaylistSubscription: ((roomPlaylist: RoomPlaylistMessage['roomPlaylist']) => void) | null = null

  private userMessages: Array<UserChannelMessage['room']> = []
  private userSubscription: ((room: UserChannelMessage['room']) => void) | null = null

  constructor(options: Options) {
    this.debug = options.debug
  }

  public bind = (websocket: WebSocket): void => {
    this.websocket = websocket

    this.websocket.onerror = this.error
    this.websocket.onmessage = (event: MessageEvent) => {
      this.parse(event)
    }
  }

  public subscribeForRoom = (): void => {
    this.send(this.generateSubscription(channels.MESSAGE_CHANNEL, {}))
    this.send(this.generateSubscription(channels.NOW_PLAYING_CHANNEL, {}))
    this.send(this.generateSubscription(channels.RECORD_LISTENS_CHANNEL, {}))
    this.send(this.generateSubscription(channels.ROOM_PLAYLIST_CHANNEL, {}))
    this.send(this.generateSubscription(channels.USERS_CHANNEL, {}))
  }

  public unsubscribeForRoom = (): void => {
    this.send(this.generateUnsubscription(channels.MESSAGE_CHANNEL))
    this.send(this.generateUnsubscription(channels.NOW_PLAYING_CHANNEL))
    this.send(this.generateUnsubscription(channels.RECORD_LISTENS_CHANNEL))
    this.send(this.generateUnsubscription(channels.ROOM_PLAYLIST_CHANNEL))
    this.send(this.generateUnsubscription(channels.USERS_CHANNEL))
  }

  public subscribeToMessage = (callback: (currentRecord: MessageChannelMessage['message']) => void): (() => void) => {
    this.messageSubscription = callback
    this.messageMessages.forEach(this.messageSubscription)
    this.messageMessages = []
    return () => (this.messageSubscription = null)
  }

  public subscribeToNowPlaying = (
    callback: (currentRecord: NowPlayingChannelMessage['room']) => void,
  ): (() => void) => {
    this.nowPlayingSubscription = callback
    this.nowPlayingMessages.forEach(this.nowPlayingSubscription)
    this.nowPlayingMessages = []
    return () => (this.nowPlayingSubscription = null)
  }

  public subscribeToRecordListens = (
    callback: (recordListens: RecordListensMessage['recordListens']) => void,
  ): (() => void) => {
    this.recordListensSubscription = callback
    this.recordListensMessages.forEach(this.recordListensSubscription)
    this.recordListensMessages = []
    return () => (this.recordListensSubscription = null)
  }

  public subscribeToRoomPlaylist = (
    callback: (roomPlaylist: RoomPlaylistMessage['roomPlaylist']) => void,
  ): (() => void) => {
    this.roomPlaylistSubscription = callback
    this.roomPlaylistMessages.forEach(this.roomPlaylistSubscription)
    this.roomPlaylistMessages = []
    return () => (this.roomPlaylistSubscription = null)
  }

  public subscribeToUsers = (callback: (room: UserChannelMessage['room']) => void): (() => void) => {
    this.userSubscription = callback
    this.userMessages.forEach(this.userSubscription)
    this.userMessages = []
    return () => (this.userSubscription = null)
  }

  private error: (event: Event) => void = event => {
    this.log(event)
  }

  private generateSubscription: <T extends keyof Subscriptions>(
    channel: T,
    args: Subscriptions[T],
  ) => { command: 'subscribe'; identifier: string } = (channel, args) => ({
    command: 'subscribe',
    identifier: JSON.stringify({ channel, ...args }),
  })

  private generateUnsubscription: <T extends keyof Subscriptions>(
    channel: T,
  ) => { command: 'unsubscribe'; identifier: string } = channel => ({
    command: 'unsubscribe',
    identifier: JSON.stringify({ channel }),
  })

  private log: (...args: Parameters<typeof console.log>) => void = (...args) => {
    if (this.debug) {
      console.log(...args)
    }
  }

  private notify: (websocketMessage: DataMessage) => void = websocketMessage => {
    switch (websocketMessage.messageType) {
      case channels.MESSAGE_CHANNEL:
        const message = websocketMessage.message.data.message
        if (!!this.messageSubscription) {
          this.messageSubscription(message)
        } else {
          this.messageMessages.push(message)
        }
        return
      case channels.NOW_PLAYING_CHANNEL:
        const currentRecord = websocketMessage.message.data.room
        if (!!this.nowPlayingSubscription) {
          this.nowPlayingSubscription(currentRecord)
        } else {
          this.nowPlayingMessages.push(currentRecord)
        }
        return
      case channels.RECORD_LISTENS_CHANNEL:
        const recordListens = websocketMessage.message.data.recordListens
        if (!!this.recordListensSubscription) {
          this.recordListensSubscription(recordListens)
        } else {
          this.recordListensMessages.push(recordListens)
        }
        return
      case channels.ROOM_PLAYLIST_CHANNEL:
        const roomPlaylist = websocketMessage.message.data.roomPlaylist
        if (!!this.roomPlaylistSubscription) {
          this.roomPlaylistSubscription(roomPlaylist)
        } else {
          this.roomPlaylistMessages.push(roomPlaylist)
        }
        return
      case channels.USERS_CHANNEL:
        const room = websocketMessage.message.data.room
        if (!!this.userSubscription) {
          this.userSubscription(room)
        } else {
          this.userMessages.push(room)
        }
        return
    }
  }

  private parse: (event: MessageEvent) => void = event => {
    const data = JSON.parse(event.data)
    if (data.identifier) {
      data.identifier = JSON.parse(data.identifier)
    }

    const parsedData: Message = data
    switch (parsedData.type) {
      case 'ping':
        return
      case 'confirm_subscription':
        this.log(parsedData.type, parsedData)
        return
      case 'reject_subscription':
        this.log(parsedData.type, parsedData)
        return
      case undefined:
        this.log(parsedData.identifier.channel, parsedData)
        this.notify({ messageType: parsedData.identifier.channel, ...parsedData })
        return
      default:
        this.log('unknown message', parsedData)
        return
    }
  }

  private send = (msg: object): void => {
    if (!this.websocket) {
      console.error('Attempting to send before websocket initialized')
      return
    }
    this.websocket.send(JSON.stringify(msg))
  }
}
