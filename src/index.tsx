import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'emotion-theming'
import App from 'App'
import theme from 'theme'

const rootEl = document.getElementById('root')

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  rootEl
)


