import React, { createContext, useState } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import Router from './Router'

type ContextProps = {
  token: string
  setToken: (token: string) => void
}
export const AuthContext = createContext<Partial<ContextProps>>({})
const App: React.FC = () => {
  const [token, setToken] = useState(localStorage.getItem('musicbox-token') || '')

  const client = new ApolloClient({
    uri: `${process.env.API_HOST}/api/v1/graphql`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ token, setToken }}>
        <Router />
      </AuthContext.Provider>
    </ApolloProvider>
  )
}

export default App
