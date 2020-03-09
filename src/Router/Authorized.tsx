import React, { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'

import Home from 'Home'
import Invitation from 'Invitation'
import Invitations from 'Invitations'
import Login from 'Login'
import Room from 'Room'
import Signup from 'Signup'

import { Client, awaitWebsocket } from 'lib/WebsocketClient/client'
import { API_HOST } from 'lib/constants'

const socketClient = new Client({ debug: true })
type WebsocketContext = InstanceType<typeof Client>
export const WebsocketContext = createContext<WebsocketContext>(socketClient)

const Router: React.FC<{ token: string }> = ({ token }) => {
  const [socketConnected, setSocketConnected] = useState(false)

  const apolloClient = new ApolloClient({
    uri: `${API_HOST}/api/v1/graphql`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  useEffect(() => {
    awaitWebsocket(token).then(websocket => {
      socketClient.bind(websocket)
      setSocketConnected(true)
    })
  }, [token])

  if (!socketConnected) {
    return <p>Loading...</p>
  }

  return (
    <ApolloProvider client={apolloClient}>
      <WebsocketContext.Provider value={socketClient}>
        <BrowserRouter>
          <Switch>
            <Route key="invitation" path="/invitation">
              <Invitation />
            </Route>

            <Route path="/invitations">
              <Invitations />
            </Route>

            <Route path="/home">
              <Home />
            </Route>

            <Route key="login" path="/login">
              <Login />
            </Route>

            <Route key="signup" path="/signup">
              <Signup />
            </Route>

            <Route path="/room/:id">
              <Room />
            </Route>

            <Redirect
              to={{
                pathname: '/home',
              }}
            />
          </Switch>
        </BrowserRouter>
      </WebsocketContext.Provider>
    </ApolloProvider>
  )
}

export default Router
