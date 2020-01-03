import React, { createContext, useState } from 'react'
import Router from './Router'

type ContextProps = {
  token: string
  setToken: (token: string) => void
}
export const AuthContext = createContext<Partial<ContextProps>>({})
const App: React.FC = () => {
  const [token, setToken] = useState(localStorage.getItem('musicbox-token') || '')

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Router />
    </AuthContext.Provider>
  )
}

export default App
