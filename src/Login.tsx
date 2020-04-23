import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Box, Heading, Text } from 'rebass'
import { Label, Input } from '@rebass/forms'
import { Lock, Mail } from 'react-feather'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { setString } from 'lib/setters'
import { API_HOST } from 'lib/constants'
import { useAuthContext } from 'Context'

type PasswordResetInitiate = {
  data: {
    passwordResetInitiate: {
      errors: string[]
    }
  }
  vars: {
    email: string
  }
}

const PASSWORD_RESET_INITIATE = gql`
  mutation PasswordResetInitiate($email: Email!) {
    passwordResetInitiate(input: { email: $email }) {
      errors
    }
  }
`

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

  const { setToken } = useAuthContext()

  const attemptLogin = (ev: React.FormEvent): void => {
    ev.preventDefault()

    setErrors('')
    request(email, password).then(response => {
      if (response.status !== 200) {
        return setErrors('Invalid email or password')
      }
      response.json().then(body => {
        setToken(body.access_token)
        history.push('/rooms')
      })
    })
  }

  const [passwordResetInitiate, { data }] = useMutation<PasswordResetInitiate['data'], PasswordResetInitiate['vars']>(
    PASSWORD_RESET_INITIATE,
  )

  const passwordReset = (): void => {
    passwordResetInitiate({ variables: { email } })
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
              <Input type="text" value={email} onChange={setString(setEmail)} placeholder="e.g. jamcity@musicbox.fm" />
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
              <Input type="password" value={password} onChange={setString(setPassword)} />
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
          <Box sx={{ textAlign: 'center' }}>
            {email && (
              <Text onClick={passwordReset} sx={{ textDecoration: 'underline', cursor: 'pointer', mt: 4 }}>
                Reset Password for {email}
              </Text>
            )}
            {data && (
              <Text>
                {data.passwordResetInitiate.errors.length === 0
                  ? 'Reset initiated, check your email!'
                  : data.passwordResetInitiate.errors[0]}
              </Text>
            )}
          </Box>
          <Box>{errors}</Box>
        </Box>
      </Box>
    </>
  )
}
export default Login
