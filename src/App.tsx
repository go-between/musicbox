import React, { createContext, useState, useEffect } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import Router from './Router'

import { Client, awaitWebsocket } from './lib/WebsocketClient/client'

type AuthContext = {
  token: string
  setToken: (token: string) => void
}
export const AuthContext = createContext<Partial<AuthContext>>({})

type WebsocketContext = InstanceType<typeof Client> | null
export const WebsocketContext = createContext<WebsocketContext>(null)

const App: React.FC = () => {
  const [token, setToken] = useState(localStorage.getItem('musicbox-token') || '')
  const [websocketClient, setWebsocketClient] = useState()

  const apolloClient = new ApolloClient({
    uri: `${process.env.API_HOST}/api/v1/graphql`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  useEffect(() => {
    if (!token) {
      return
    }

    awaitWebsocket(token).then(websocket => {
      const socketClient = new Client(websocket, { debug: true })
      socketClient.bind()

      setWebsocketClient(socketClient)
    })
  }, [token])

  return (
    <ApolloProvider client={apolloClient}>
      <AuthContext.Provider value={{ token, setToken }}>
        <WebsocketContext.Provider value={websocketClient}>
          <Router />
        </WebsocketContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  )
}

export default App
