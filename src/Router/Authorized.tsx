import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import { Box, Flex } from 'rebass'

import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import { InMemoryCache } from 'apollo-cache-inmemory'
import introspectionQueryResultData from '../../fragmentTypes.json'

import { ApprovalContextProvider } from 'Approval'
import Invitation from 'Invitation'
import Invitations from 'Invitations'
import JumpMenu, { JumpNavigationContextProvider } from 'JumpMenu'
import Library from 'Library'
import Login from 'Login'
import PasswordReset from 'PasswordReset'
import Player, { PlayerContextProvider, VolumeContextProvider } from 'Player'
import Recommendations from 'Recommendations'
import Room from 'Room'
import Rooms from 'Rooms'
import SideNav from 'SideNav'
import Signup from 'Signup'
import UserSettings from 'UserSettings'
import { API_HOST } from 'lib/constants'

import {
  AddRecordContextProvider,
  CurrentRecordContextProvider,
  PlaylistRecordsContextProvider,
  UserContextProvider,
  WebsocketContextProvider,
  VideoContextProvider,
} from 'Context'

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

    <Route key="password-reset" path="/password-reset">
      <PasswordReset />
    </Route>

    <Route key="signup" path="/signup">
      <Signup />
    </Route>

    <Route path="/recommendations">
      <Recommendations />
    </Route>

    <Route path="/rooms">
      <Rooms />
    </Route>

    <Route path="/room/:id">
      <Room />
    </Route>

    <Route path="/user-settings">
      <UserSettings />
    </Route>

    <Redirect
      to={{
        pathname: '/rooms',
      }}
    />
  </Switch>
)

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})
const cache = new InMemoryCache({ fragmentMatcher })

const Authorized: React.FC<{ token: string }> = ({ token }) => {
  const apolloClient = new ApolloClient({
    cache,
    uri: `${API_HOST}/api/v1/graphql`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return (
    <WebsocketContextProvider token={token}>
      <ApolloProvider client={apolloClient}>
        <AddRecordContextProvider>
          <VideoContextProvider>
            <UserContextProvider>
              <PlaylistRecordsContextProvider>
                <CurrentRecordContextProvider>
                  <VolumeContextProvider>
                    <ApprovalContextProvider>
                      <PlayerContextProvider>
                        <JumpNavigationContextProvider>
                          <JumpMenu />

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
                                  flexDirection: ['column', 'row'],
                                  height: '100%',
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
                              <Player />
                            </Box>
                          </Flex>
                        </JumpNavigationContextProvider>
                      </PlayerContextProvider>
                    </ApprovalContextProvider>
                  </VolumeContextProvider>
                </CurrentRecordContextProvider>
              </PlaylistRecordsContextProvider>
            </UserContextProvider>
          </VideoContextProvider>
        </AddRecordContextProvider>
      </ApolloProvider>
    </WebsocketContextProvider>
  )
}

export default Authorized
