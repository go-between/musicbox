import React, { createContext, useState } from 'react'

import Router from 'Router'
import { ThemeProvider } from 'emotion-theming'
import { Global } from '@emotion/core'
import css from '@styled-system/css'
import theme from 'theme'

type AuthContext = {
  token: string
  setToken: (token: string) => void
}

export const AuthContext = createContext<AuthContext>({
  token: '',
  setToken: (token: string) => {
    console.log('setToken must be overridden', token)
  },
})
const App: React.FC = () => {
  const [token, setToken] = useState(localStorage.getItem('musicbox-token') || '')

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <ThemeProvider theme={theme}>
        <Global
          styles={css({
            body: {
              color: 'text',
              bg: 'background',
              lineHeight: '1.5',
              m: 0,
            },
          })}
        />
        <Router />
      </ThemeProvider>
    </AuthContext.Provider>
  )
}

export default App
