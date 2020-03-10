import React, { createContext, useEffect, useState } from 'react'

import { Client, awaitWebsocket } from 'lib/WebsocketClient/client'

const socketClient = new Client({ debug: true })
type WebsocketContext = InstanceType<typeof Client>
export const WebsocketContext = createContext<WebsocketContext>(socketClient)

const WebsocketContextProvider: React.FC<{ token: string }> = ({ children, token }) => {
  const [socketConnected, setSocketConnected] = useState(false)

  useEffect(() => {
    awaitWebsocket(token).then(websocket => {
      socketClient.bind(websocket)
      setSocketConnected(true)
    })
  }, [token])

  if (!socketConnected) {
    return <p>Loading...</p>
  }

  return <WebsocketContext.Provider value={socketClient}>{children}</WebsocketContext.Provider>
}

export default WebsocketContextProvider
