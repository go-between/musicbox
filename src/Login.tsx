import React, { useState } from 'react'
import { AuthContext } from './App'

const setFromEvent = (changeFn: (v: string) => void) => (ev: React.ChangeEvent<HTMLInputElement>) =>
  changeFn(ev.target.value)

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState('')

  const attemptLogin = () => {
    const url = `${process.env.API_HOST}/api/v1/oauth/token`
    const formData = new URLSearchParams()
    formData.append('username', email)
    formData.append('password', password)
    formData.append('grant_type', 'password')
    console.log(formData.toString(), url)
  }

  return (
    <AuthContext.Consumer>
      {({ setToken }) => {
        return (
          <>
            <input type="text" value={email} onChange={setFromEvent(setEmail)} />
            <input type="text" value={password} onChange={setFromEvent(setPassword)} />
            <button onClick={attemptLogin}>Click</button>
          </>
        )
      }}
    </AuthContext.Consumer>
  )
}
export default Login
