import {
  channels,
  DataMessage,
  Message,
  Options,
  MessageChannelMessage,
  NowPlayingChannelMessage,
  PinnedMessagesChannelMessage,
  RecordListensMessage,
  RoomPlaylistMessage,
  TeamMessage,
  Subscriptions,
  UserChannelMessage,
} from './types'

import { WEBSOCKET_HOST } from 'lib/constants'

export class Client {
  private debug: boolean
  private monitor: ReturnType<typeof setTimeout> | null = null
  private token: string
  private setSocketConnected: (connected: boolean) => void
  private websocket: WebSocket | null = null

  private messageMessages: Array<MessageChannelMessage['message']> = []
  private messageSubscription: ((message: MessageChannelMessage['message']) => void) | null = null

  private nowPlayingMessages: Array<NowPlayingChannelMessage['room']> = []
  private nowPlayingSubscription: ((currentRecord: NowPlayingChannelMessage['room']) => void) | null = null

  private pinnedMessagesMessages: Array<PinnedMessagesChannelMessage['pinnedMessages']> = []
  private pinnedMessagesSubscription:
    | ((pinnedMessages: PinnedMessagesChannelMessage['pinnedMessages']) => void)
    | null = null

  private recordListensMessages: Array<RecordListensMessage['recordListens']> = []
  private recordListensSubscription: ((recordListens: RecordListensMessage['recordListens']) => void) | null = null

  private roomPlaylistMessages: Array<RoomPlaylistMessage['roomPlaylist']> = []
  private roomPlaylistSubscription: ((roomPlaylist: RoomPlaylistMessage['roomPlaylist']) => void) | null = null

  private teamMessages: Array<TeamMessage['team']> = []
  private teamSubscription: ((team: TeamMessage['team']) => void) | null = null

  private userMessages: Array<UserChannelMessage['room']> = []
  private userSubscription: ((room: UserChannelMessage['room']) => void) | null = null

  constructor(token: string, setSocketConnected: (connected: boolean) => void, options: Options) {
    this.token = token
    this.setSocketConnected = setSocketConnected
    this.debug = options.debug
  }

  public connect = (): Promise<void> => {
    return this.awaitWebsocket().then(websocket => {
      this.websocket = websocket

      this.websocket.onerror = this.error
      this.websocket.onmessage = (event: MessageEvent) => {
        this.parse(event)
      }

      this.setSocketConnected(true)
    })
  }

  public disconnect = (): void => {
    if (this.websocket) {
      this.websocket.close()
    }
    this.setSocketConnected(false)
  }

  public subscribeForRoom = (): void => {
    this.send(this.generateSubscription(channels.MESSAGE_CHANNEL, {}))
    this.send(this.generateSubscription(channels.NOW_PLAYING_CHANNEL, {}))
    this.send(this.generateSubscription(channels.PINNED_MESSAGES_CHANNEL, {}))
    this.send(this.generateSubscription(channels.RECORD_LISTENS_CHANNEL, {}))
    this.send(this.generateSubscription(channels.ROOM_PLAYLIST_CHANNEL, {}))
    this.send(this.generateSubscription(channels.USERS_CHANNEL, {}))
  }

  public unsubscribeForRoom = (): void => {
    this.send(this.generateUnsubscription(channels.MESSAGE_CHANNEL))
    this.send(this.generateUnsubscription(channels.NOW_PLAYING_CHANNEL))
    this.send(this.generateUnsubscription(channels.PINNED_MESSAGES_CHANNEL))
    this.send(this.generateUnsubscription(channels.RECORD_LISTENS_CHANNEL))
    this.send(this.generateUnsubscription(channels.ROOM_PLAYLIST_CHANNEL))
    this.send(this.generateUnsubscription(channels.USERS_CHANNEL))
  }

  public subscribeForTeam = (): void => {
    this.send(this.generateSubscription(channels.TEAM_CHANNEL, {}))
  }

  public unsubscribeForTeam = (): void => {
    this.send(this.generateUnsubscription(channels.TEAM_CHANNEL))
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

  public subscribeToPinnedMessages = (
    callback: (pinnedMessages: PinnedMessagesChannelMessage['pinnedMessages']) => void,
  ): (() => void) => {
    this.pinnedMessagesSubscription = callback
    this.pinnedMessagesMessages.forEach(this.pinnedMessagesSubscription)
    this.pinnedMessagesMessages = []
    return () => (this.pinnedMessagesSubscription = null)
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

  public subscribeToTeam = (callback: (team: TeamMessage['team']) => void): (() => void) => {
    this.teamSubscription = callback
    this.teamMessages.forEach(this.teamSubscription)
    this.teamMessages = []
    return () => (this.teamSubscription = null)
  }

  public subscribeToUsers = (callback: (room: UserChannelMessage['room']) => void): (() => void) => {
    this.userSubscription = callback
    this.userMessages.forEach(this.userSubscription)
    this.userMessages = []
    return () => (this.userSubscription = null)
  }

  private awaitWebsocket = (): Promise<WebSocket> => {
    return new Promise((resolve, reject) => {
      const formData = new URLSearchParams()
      formData.append('token', this.token)
      const socket = new WebSocket(`${WEBSOCKET_HOST}?${formData.toString()}`)

      socket.onopen = () => resolve(socket)
      socket.onerror = () => reject(socket)
    })
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
      // eslint-disable-next-line no-console
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
      case channels.PINNED_MESSAGES_CHANNEL:
        const pinnedMessages = websocketMessage.message.data.pinnedMessages
        if (!!this.pinnedMessagesSubscription) {
          this.pinnedMessagesSubscription(pinnedMessages)
        } else {
          this.pinnedMessagesMessages.push(pinnedMessages)
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
      case channels.TEAM_CHANNEL:
        const team = websocketMessage.message.data.team
        if (!!this.teamSubscription) {
          this.teamSubscription(team)
        } else {
          this.teamMessages.push(team)
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
        if (this.monitor !== null) {
          clearTimeout(this.monitor)
        }
        this.monitor = setTimeout(this.reconnect, 10000)

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

  private reconnect = (): void => {
    this.disconnect()
    this.connect()
  }

  private send = (msg: object): void => {
    if (!this.websocket) {
      // eslint-disable-next-line no-console
      console.error('Attempting to send before websocket initialized')
      return
    }
    this.websocket.send(JSON.stringify(msg))
  }
}
