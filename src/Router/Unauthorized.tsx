import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'

import { API_HOST } from 'lib/constants'

import Invitation from 'Invitation'
import Login from 'Login'
import Signup from 'Signup'

const Unauthorized: React.FC = () => {
  const apolloClient = new ApolloClient({
    uri: `${API_HOST}/api/v1/graphql`,
  })

  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Switch>
          <Route key="invitation" path="/invitation">
            <Invitation />
          </Route>

          <Route key="login" path="/login">
            <Login />
          </Route>

          <Route key="signup" path="/signup">
            <Signup />
          </Route>

          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default Unauthorized
