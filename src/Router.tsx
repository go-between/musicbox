import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { AuthContext } from 'App'

import Signup from 'Signup'
import Login from 'Login'
import Home from 'Home'
import Room from 'Room'

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
