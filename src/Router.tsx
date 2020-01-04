import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { AuthContext } from './App'

import Login from './Login'
import Home from './Home'
import Room from './Room'

const Router: React.FC = () => {
  return (
    <AuthContext.Consumer>
      {({ token }) => {
        if (!token) {
          return (
            <BrowserRouter>
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Redirect
                  to={{
                    pathname: '/login',
                  }}
                />
              </Switch>
            </BrowserRouter>
          )
        }

        return (
          <BrowserRouter>
            <Switch>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/room">
                <Room />
              </Route>
            </Switch>
          </BrowserRouter>
        )
      }}
    </AuthContext.Consumer>
  )
}

export default Router
