import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'

import { ApprovalContextProvider } from 'Approval'
import Home from 'Marketing/Home'
import LinerNotes from 'Marketing/LinerNotes'
import Features from 'Marketing/Features'
import Invitation from 'Invitation'
import Invitations from 'Invitations'
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
  CurrentRecordContextProvider,
  PlaylistRecordsContextProvider,
  UserContextProvider,
  WebsocketContextProvider,
  VideoContextProvider,
} from 'Context'

const InnerRoutes: React.FC = () => (
  <Switch>
    <Route key="home" path="/" exact={true}>
      <Home />
    </Route>

    <Route key="LinerNotes" path="/liner-notes">
      <LinerNotes />
    </Route>

    <Route key="Features" path="/features">
      <Features />
    </Route>

    <Route key="invitation" path="/invitation">
      <Invitation />
    </Route>

    <Route path="/invitations">
      <SideNav>
        <Invitations />
      </SideNav>
    </Route>

    <Route path="/library">
      <SideNav>
        <Library />
      </SideNav>
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
      <SideNav>
        <Recommendations />
      </SideNav>
    </Route>

    <Route path="/rooms">
      <SideNav>
        <Rooms />
      </SideNav>
    </Route>

    <Route path="/room/:id">
      <SideNav>
        <Room />
      </SideNav>
    </Route>

    <Route path="/user-settings">
      <SideNav>
        <UserSettings />
      </SideNav>
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
        <VideoContextProvider>
          <UserContextProvider>
            <PlaylistRecordsContextProvider>
              <CurrentRecordContextProvider>
                <VolumeContextProvider>
                  <ApprovalContextProvider>
                    <PlayerContextProvider>
                      <InnerRoutes/>
                    </PlayerContextProvider>
                  </ApprovalContextProvider>
                </VolumeContextProvider>
              </CurrentRecordContextProvider>
            </PlaylistRecordsContextProvider>
          </UserContextProvider>
        </VideoContextProvider>
      </ApolloProvider>
    </WebsocketContextProvider>
  )
}

export default Authorized
