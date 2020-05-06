import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { Client } from 'lib/WebsocketClient/client'

type WebsocketContext = InstanceType<typeof Client>
const WebsocketContext = createContext<WebsocketContext | null>(null)

const WebsocketContextProvider: React.FC<{ token: string }> = ({ children, token }) => {
  const [socketConnected, setSocketConnected] = useState(false)
  const socketClient = useMemo(() => {
    return new Client(token, setSocketConnected, { debug: true })
  }, [token])

  useEffect(() => {
    socketClient.connect()
    return () => socketClient.disconnect()
  }, [socketClient])

  if (!socketConnected) {
    return <p>Loading...</p>
  }

  return <WebsocketContext.Provider value={socketClient}>{children}</WebsocketContext.Provider>
}

export const useWebsocketContext = (): WebsocketContext => {
  const websocket = useContext(WebsocketContext)

  if (websocket === null) {
    throw new Error('Websocket called outside of context')
  }

  return websocket
}
export default WebsocketContextProvider
