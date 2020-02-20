import React, { createContext, useState, useEffect } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import Router from 'Router'
import { ThemeProvider } from 'emotion-theming'
import { Global } from '@emotion/core'
import css from '@styled-system/css'
import theme from 'theme'

import { Client, awaitWebsocket } from 'lib/WebsocketClient/client'
import { API_HOST } from 'lib/constants'

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
    uri: `${API_HOST}/api/v1/graphql`,
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
          <ThemeProvider theme={theme}>
            <Global
              styles={css({
                body: {
                  color: 'text',
                  bg: 'background',
                  lineHeight: '1.5',
                  m: 0,
                },
              })}
            />
            <Router />
          </ThemeProvider>
        </WebsocketContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  )
}

export default App
