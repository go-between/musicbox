import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import { Box, Flex } from 'rebass'

import Invitation from 'Invitation'
import Invitations from 'Invitations'
import Library from 'Library'
import Login from 'Login'
import Room from 'Room'
import Rooms from 'Rooms'
import SideNav from 'SideNav'
import Signup from 'Signup'
import { API_HOST } from 'lib/constants'

import { UserContextProvider, WebsocketContextProvider } from 'Context'

const InnerRoutes: React.FC = () => (
  <Switch>
    <Route key="invitation" path="/invitation">
      <Invitation />
    </Route>

    <Route path="/invitations">
      <Invitations />
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

    <Route path="/rooms">
      <Rooms />
    </Route>

    <Route path="/room/:id">
      <Room />
    </Route>

    <Redirect
      to={{
        pathname: '/rooms',
      }}
    />
  </Switch>
)

const Authorized: React.FC<{ token: string }> = ({ token }) => {
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
          <Flex
            sx={{
              alignItems: 'top',
              bg: 'background',
              flexDirection: 'column',
              height: '100vh',
              mx: 'auto',
              position: 'relative',
            }}
          >
            <Flex
              sx={{
                flexDirection: 'row',
                height: '100%',
                overflow: 'hidden',
              }}
            >
              <Box
                as="aside"
                sx={{
                  bg: 'background',
                  borderRight: '1px solid',
                  borderColor: 'accent',
                  display: ['none', 'flex'],
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                  width: ['100%', '300px'],
                }}
              >
                <SideNav />
              </Box>
              <Flex
                as="main"
                sx={{
                  flexDirection: 'column',
                  width: ['100%'],
                }}
              >
                <InnerRoutes />
              </Flex>
            </Flex>
            <Box
              sx={{
                borderTop: '1px solid',
                borderColor: 'accent',
              }}
            >
              Footer
            </Box>
          </Flex>
        </UserContextProvider>
      </ApolloProvider>
    </WebsocketContextProvider>
  )
}

export default Authorized
