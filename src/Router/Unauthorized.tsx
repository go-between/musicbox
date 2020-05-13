import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'

import { API_HOST } from 'lib/constants'

import Marketing from 'Marketing'
import Invitation from 'Invitation'
import Login from 'Login'
import PasswordReset from 'PasswordReset'
import Signup from 'Signup'

const Unauthorized: React.FC = () => {
  const apolloClient = new ApolloClient({
    uri: `${API_HOST}/api/v1/graphql`,
  })

  return (
    <ApolloProvider client={apolloClient}>
<<<<<<< HEAD
      <BrowserRouter>
        <Switch>
          <Route key="marketing" path="/marketing">
            <Marketing />
          </Route>

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
=======
      <Switch>
        <Route key="invitation" path="/invitation">
          <Invitation />
        </Route>

        <Route key="login" path="/login">
          <Login />
        </Route>

        <Route key="password-reset" path="/password-reset">
          <PasswordReset />
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
>>>>>>> 4940de526a081a349ff2d8bb624f5d368e8dceef
    </ApolloProvider>
  )
}

export default Unauthorized
