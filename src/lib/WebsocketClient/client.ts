import { channels, DataMessage, Message, Options, Subscriptions } from './types'

import { RoomType } from '../apiTypes'

export const awaitWebsocket = (token: string): Promise<WebSocket> => {
  return new Promise((resolve, reject) => {
    const formData = new URLSearchParams()
    formData.append('token', token)
    const socket = new WebSocket(`${process.env.WS_HOST}?${formData.toString()}`)

    socket.onopen = () => resolve(socket)
    socket.onerror = () => reject(socket)
  })
}

export class Client {
  private debug: boolean
  private userSubscription: (room: RoomType) => void = () => ({})
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

  public subscribeToUsers = (callback: (room: RoomType) => void): (() => void) => {
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
