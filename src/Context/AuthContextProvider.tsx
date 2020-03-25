import React, { createContext, useContext, useState } from 'react'

import { retrieveToken, persistToken } from 'lib/localStore'

const TokenContext = createContext<string>('')
type SetToken = (token: string) => void
const SetTokenContext = createContext<SetToken | undefined>(undefined)

const AuthContextProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState(retrieveToken())

  const wrappedSetToken = (token: string): void => {
    setToken(token)
    persistToken(token)
  }

  return (
    <TokenContext.Provider value={token}>
      <SetTokenContext.Provider value={wrappedSetToken}>{children}</SetTokenContext.Provider>
    </TokenContext.Provider>
  )
}

export const useAuthContext: () => { token: string; setToken: SetToken } = () => {
  const setToken = useContext(SetTokenContext)
  if (setToken === undefined) {
    throw new Error('Auth Context accessed before being set')
  }

  return {
    token: useContext(TokenContext),
    setToken,
  }
}
export default AuthContextProvider
