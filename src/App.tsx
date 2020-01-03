import React, { createContext, useState } from 'react'
import Router from './Router'

export const AuthContext = createContext({ token: '', setToken: (token: string) => {} })
const App: React.FC = () => {
  const [token, setToken] = useState(localStorage.getItem('musicbox-token') || '')

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Router />
    </AuthContext.Provider>
  )
}

export default App
