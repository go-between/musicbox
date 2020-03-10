import React from 'react'
import { useAuthContext } from 'Context'

import Authorized from './Authorized'
import Unauthorized from './Unauthorized'

const Router: React.FC = () => {
  const { token } = useAuthContext()

  if (!token) {
    return <Unauthorized />
  }

  return <Authorized token={token} />
}

export default Router
