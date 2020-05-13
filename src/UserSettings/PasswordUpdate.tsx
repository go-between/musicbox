import React, { useEffect, useState } from 'react'
import { Button, Box, Text } from 'rebass'
import { Label, Input } from '@rebass/forms'
import { Lock } from 'react-feather'
import { useMutation } from '@apollo/react-hooks'

import { setString } from 'lib/setters'

import { UserPasswordUpdate, USER_PASSWORD_UPDATE } from './graphql'

const PasswordUpdate: React.FC = () => {
  const [completed, setCompleted] = useState(false)
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')

  const [passwordUpdate, { data }] = useMutation<UserPasswordUpdate['data'], UserPasswordUpdate['vars']>(
    USER_PASSWORD_UPDATE,
  )

  const updatePassword = (ev: React.FormEvent): void => {
    ev.preventDefault()
    passwordUpdate({ variables: { password, newPassword } })
  }

  useEffect(() => {
    if (!data) {
      return
    }

    if (data.userPasswordUpdate.errors.length > 0) {
      setError(data.userPasswordUpdate.errors[0])
      return
    } else {
      setPassword('')
      setNewPassword('')
      setCompleted(true)
    }
  }, [data, setError])

  if (completed) {
    return (
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
        <Text>Password updated successfully!</Text>
      </Box>
    )
  }

  return (
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
          <Label htmlFor="password">Existing Password</Label>
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
        <Box mb={4}>
          <Label htmlFor="new-password">New Password</Label>
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
            <Input type="password" value={newPassword} onChange={setString(setNewPassword)} />
          </Box>
        </Box>

        <Box>
          <Button
            onClick={updatePassword}
            sx={{
              textAlign: 'center',
              width: '100%',
            }}
          >
            Update Password
          </Button>
        </Box>
        <Box>{error}</Box>
      </Box>
    </Box>
  )
}
export default PasswordUpdate
