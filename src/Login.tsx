import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Box, Heading } from 'rebass'
import { Label, Input } from '@rebass/forms'
import { Lock, Mail } from 'react-feather'

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

  const { setToken } = useContext(AuthContext)

  const attemptLogin = (ev: React.FormEvent): void => {
    ev.preventDefault()
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
    <>
      <Box py={4}>
        <Heading
          sx={{
            fontWeight: '800',
            fontSize: 5,
            textAlign: 'center',
          }}
        >
          MusicBox
        </Heading>
      </Box>
      <Box
        sx={{
          borderRadius: 4,
          boxShadow: 'xl',
          maxWidth: 400,
          mx: 'auto',
        }}
        bg="accent"
        p={4}
      >
        <Box as="form">
          <Box mb={4}>
            <Label htmlFor="name">Email</Label>
            <Box
              sx={{
                alignItems: 'center',
                bg: 'background',
                borderRadius: 4,
                display: 'flex',
                px: 2,
                py: 1,
                '&:focus-within': {
                  boxShadow: 'outline',
                },
              }}
            >
              <Mail color="#4A5568" size={20} />
              <Input
                type="text"
                value={email}
                onChange={setFromEvent(setEmail)}
                placeholder="e.g. jamcity@musicbox.fm"
              />
            </Box>
          </Box>

          <Box mb={4}>
            <Label htmlFor="password">Password</Label>
            <Box
              sx={{
                alignItems: 'center',
                bg: 'background',
                borderRadius: 4,
                display: 'flex',
                px: 2,
                py: 1,
                '&:focus-within': {
                  boxShadow: 'outline',
                },
              }}
            >
              <Lock color="#4A5568" size={20} />
              <Input type="password" value={password} onChange={setFromEvent(setPassword)} />
            </Box>
          </Box>
          <Box>
            <Button
              onClick={attemptLogin}
              sx={{
                textAlign: 'center',
                width: '100%',
              }}
            >
              Log In
            </Button>
          </Box>
          <Box>{errors}</Box>
        </Box>
      </Box>
    </>
  )
}
export default Login
