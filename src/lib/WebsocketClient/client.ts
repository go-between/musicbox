import {
  channels,
  DataMessage,
  Message,
  Options,
  MessageChannelMessage,
  NowPlayingChannelMessage,
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
  private messageSubscription: (message: MessageChannelMessage['message']) => void = () => ({})
  private nowPlayingSubscription: (currentRecord: NowPlayingChannelMessage['room']) => void = () => ({})
  private roomPlaylistSubscription: (roomPlaylist: RoomPlaylistMessage['roomPlaylist']) => void = () => ({})
  private userSubscription: (room: UserChannelMessage['room']) => void = () => ({})
  private websocket: WebSocket

  constructor(websocket: WebSocket, options: Options) {
    this.debug = options.debug
    this.websocket = websocket
  }

  public bind = (): void => {
    this.websocket.onerror = this.error
    this.websocket.onmessage = (event: MessageEvent) => {
      this.parse(event)
    }
  }

  public subscribeToMessage = (callback: (currentRecord: MessageChannelMessage['message']) => void): (() => void) => {
    this.send(this.generateSubscription(channels.MESSAGE_CHANNEL, {}))
    this.messageSubscription = callback
    return () => this.send(this.generateUnsubscription(channels.MESSAGE_CHANNEL))
  }

  public subscribeToNowPlaying = (
    callback: (currentRecord: NowPlayingChannelMessage['room']) => void,
  ): (() => void) => {
    this.send(this.generateSubscription(channels.NOW_PLAYING_CHANNEL, {}))
    this.nowPlayingSubscription = callback
    return () => this.send(this.generateUnsubscription(channels.NOW_PLAYING_CHANNEL))
  }

  public subscribeToRoomPlaylist = (
    callback: (roomPlaylist: RoomPlaylistMessage['roomPlaylist']) => void,
  ): (() => void) => {
    this.send(this.generateSubscription(channels.ROOM_PLAYLIST_CHANNEL, {}))
    this.roomPlaylistSubscription = callback
    return () => this.send(this.generateUnsubscription(channels.ROOM_PLAYLIST_CHANNEL))
  }

  public subscribeToUsers = (callback: (room: UserChannelMessage['room']) => void): (() => void) => {
    this.send(this.generateSubscription(channels.USERS_CHANNEL, {}))
    this.userSubscription = callback
    return () => this.send(this.generateUnsubscription(channels.USERS_CHANNEL))
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
    this.log(websocketMessage)

    switch (websocketMessage.messageType) {
      case channels.MESSAGE_CHANNEL:
        const message = websocketMessage.message.data.message
        this.messageSubscription(message)
        return
      case channels.NOW_PLAYING_CHANNEL:
        const currentRecord = websocketMessage.message.data.room
        this.nowPlayingSubscription(currentRecord)
        return
      case channels.ROOM_PLAYLIST_CHANNEL:
        const roomPlaylist = websocketMessage.message.data.roomPlaylist
        this.roomPlaylistSubscription(roomPlaylist)
        return
      case channels.USERS_CHANNEL:
        const room = websocketMessage.message.data.room
        this.userSubscription(room)
        return
    }
  }

  private parse: (event: MessageEvent) => void = event => {
    const data = JSON.parse(event.data)
    if (data.identifier) {
      data.identifier = JSON.parse(data.identifier)
    }

    const parsedData: Message = data
    this.log(parsedData.type, parsedData)

    switch (parsedData.type) {
      case 'ping':
        return
      case 'confirm_subscription':
        return
      case 'reject_subscription':
        return
      case undefined:
        this.notify({ messageType: parsedData.identifier.channel, ...parsedData })
        return
    }
  }

  private send = (msg: object): void => this.websocket.send(JSON.stringify(msg))
}
