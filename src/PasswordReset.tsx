import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Box, Heading } from 'rebass'
import { Label, Input } from '@rebass/forms'
import { Lock } from 'react-feather'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { useQueryParams } from 'lib/useQueryParams'
import { setString } from 'lib/setters'
import { useAuthContext } from 'Context'

type PasswordResetComplete = {
  data: {
    passwordResetComplete: {
      accessToken?: string
      errors: string[]
    }
  }
  vars: {
    email: string
    password: string
    token: string
  }
}

const PASSWORD_RESET_COMPLETE = gql`
  mutation PasswordResetComplete($email: Email!, $password: String!, $token: String!) {
    passwordResetComplete(input: { email: $email, password: $password, token: $token }) {
      accessToken
      errors
    }
  }
`

const PasswordReset: React.FC = () => {
  const params = useQueryParams()
  const token = params.get('token') || ''
  const email = params.get('email') || ''

  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const history = useHistory()

  const { setToken } = useAuthContext()

  const [passwordResetComplete, { data }] = useMutation<PasswordResetComplete['data'], PasswordResetComplete['vars']>(
    PASSWORD_RESET_COMPLETE,
  )

  const passwordReset = (ev: React.FormEvent): void => {
    ev.preventDefault()
    passwordResetComplete({ variables: { email, password, token } })
  }

  useEffect(() => {
    if (!data) {
      return
    }

    if (data.passwordResetComplete.errors.length > 0) {
      setError(data.passwordResetComplete.errors[0])
      return
    }

    if (!!data.passwordResetComplete.accessToken) {
      setToken(data.passwordResetComplete.accessToken)
      history.push('/rooms')
    }
  }, [data, history, setToken])

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
            <Label htmlFor="password">New Password</Label>
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
              onClick={passwordReset}
              sx={{
                textAlign: 'center',
                width: '100%',
              }}
            >
              Reset Password
            </Button>
          </Box>
          <Box>{error}</Box>
        </Box>
      </Box>
    </>
  )
}
export default PasswordReset
