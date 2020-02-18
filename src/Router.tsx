import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { AuthContext } from 'App'

import Home from 'Home'
import Invitations from 'Invitations'
import Login from 'Login'
import Room from 'Room'
import Signup from 'Signup'

const Router: React.FC = () => {
  const { token } = useContext(AuthContext)
  const commonRoutes = [
    <Route key="login" path="/login">
      <Login />
    </Route>,

    <Route key="signup" path="/signup">
      <Signup />
    </Route>,
  ]

  if (!token) {
    return (
      <BrowserRouter>
        <Switch>
          {commonRoutes}
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
        {commonRoutes}
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/room/:id">
          <Room />
        </Route>
        <Route path="/invitations">
          <Invitations />
        </Route>

        <Redirect
          to={{
            pathname: '/home',
          }}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
