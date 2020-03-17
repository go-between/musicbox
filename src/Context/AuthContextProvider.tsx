import React, { createContext, useContext, useState } from 'react'

import { retrieveToken, persistToken } from 'lib/localStore'

const TokenContext = createContext<string>('')
type SetToken = (token: string) => void
const SetTokenContext = createContext<SetToken>((token: string) => {
  console.log('setToken must be overridden', token)
})

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
  return {
    token: useContext(TokenContext),
    setToken: useContext(SetTokenContext),
  }
}
export default AuthContextProvider
