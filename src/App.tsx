import React from 'react'
import { ToastProvider } from 'react-toast-notifications'
import Router from 'Router'
import { ThemeProvider } from 'emotion-theming'
import { Global } from '@emotion/core'
import css from '@styled-system/css'
import theme from 'theme'

import { AuthContextProvider } from 'Context'

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <ToastProvider>
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
        </ToastProvider>
      </ThemeProvider>
    </AuthContextProvider>
  )
}

export default App
