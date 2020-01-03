import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './Login'
import { AuthContext } from './App'

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
      }}
    </AuthContext.Consumer>
  )
}

export default Router
