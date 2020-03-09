import React, { useContext } from 'react'
import { AuthContext } from 'App'

import Authorized from './Authorized'
import Unauthorized from './Unauthorized'

const Router: React.FC = () => {
  const { token } = useContext(AuthContext)

  if (!token) {
    return <Unauthorized />
  }

  return <Authorized token={token} />
}

export default Router
