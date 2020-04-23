import React from 'react'
import { useAuthContext } from 'Context'
import { BrowserRouter } from 'react-router-dom'

import Authorized from './Authorized'
import Unauthorized from './Unauthorized'

const Router: React.FC = () => {
  const { token } = useAuthContext()

  if (!token) {
    return (
      <BrowserRouter>
        <Unauthorized />
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <Authorized token={token} />
    </BrowserRouter>
  )
}

export default Router
