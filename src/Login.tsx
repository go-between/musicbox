import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Box } from 'rebass'
import { Label, Input, Select, Textarea, Radio, Checkbox } from '@rebass/forms'

import { API_HOST } from 'lib/constants'
import { AuthContext } from 'App'

type SetFromEvent = (changeFn: (v: string) => void) => (ev: React.ChangeEvent<HTMLInputElement>) => void
const setFromEvent: SetFromEvent = changeFn => ev => changeFn(ev.target.value)

const request = (email: string, password: string): Promise<Response> => {
  const url = `${API_HOST}/api/v1/oauth/token`
  const formData = new URLSearchParams()
  formData.append('username', email)
  formData.append('password', password)
  formData.append('grant_type', 'password')
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  })
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState('')
  const history = useHistory()

  const attemptLogin = (setToken?: (token: string) => void) => () => {
    if (!setToken) {
      return
    }

    setErrors('')
    request(email, password).then(response => {
      if (response.status !== 200) {
        return setErrors('Invalid email or password')
      }
      response.json().then(body => {
        setToken(body.access_token)
        localStorage.setItem('musicbox-token', body.access_token)
        history.push('/home')
      })
    })
  }

  return (
    <AuthContext.Consumer>
      {({ setToken }) => {
        return (
          <Box
            sx={{
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'gray300',
              borderRadius: 2,
              boxShadow: 'md',
              maxWidth: 512,
              mx: 'auto',
              my: 5,
            }}
            bg="white"
            p={4}
          >
            <Box as="form">
              <Box mb={4}>
                <Label htmlFor="name">Email</Label>
                <Input type="text" value={email} onChange={setFromEvent(setEmail)} />
              </Box>
              <Box mb={4}>
                <Label htmlFor="password">Password</Label>
                <Input type="text" value={password} onChange={setFromEvent(setPassword)} />
              </Box>
              <Box>
                <Button onClick={attemptLogin(setToken)}>Log in</Button>
              </Box>
              <Box>{errors}</Box>
            </Box>
          </Box>
        )
      }}
    </AuthContext.Consumer>
  )
}
export default Login
