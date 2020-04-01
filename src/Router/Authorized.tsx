import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'

import Marketing from 'Marketing'
import Home from 'Home'
import Invitation from 'Invitation'
import Invitations from 'Invitations'
import Library from 'Library'
import Login from 'Login'
import Room from 'Room'
import Signup from 'Signup'
import { API_HOST } from 'lib/constants'

import { UserContextProvider, WebsocketContextProvider } from 'Context'

const Router: React.FC<{ token: string }> = ({ token }) => {
  const apolloClient = new ApolloClient({
    uri: `${API_HOST}/api/v1/graphql`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return (
    <WebsocketContextProvider token={token}>
      <ApolloProvider client={apolloClient}>
        <UserContextProvider>
          <BrowserRouter>
            <Switch>
              <Route key="marketing" path="/marketing">
                <Marketing />
              </Route>

              <Route key="invitation" path="/invitation">
                <Invitation />
              </Route>

              <Route path="/invitations">
                <Invitations />
              </Route>

              <Route path="/home">
                <Home />
              </Route>

              <Route path="/library">
                <Library />
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
        </UserContextProvider>
      </ApolloProvider>
    </WebsocketContextProvider>
  )
}

export default Router
