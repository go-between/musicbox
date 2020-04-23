import React, { useState } from 'react'
import { Button, Box, Text } from 'rebass'
import { Label, Input } from '@rebass/forms'
import { Lock } from 'react-feather'
import { useMutation } from '@apollo/react-hooks'

import { useUserContext } from 'Context'
import { setString } from 'lib/setters'

import { UserUpdateQuery, USER_UPDATE_QUERY } from './graphql'

const UserUpdate: React.FC = () => {
  const user = useUserContext()
  const [name, setName] = useState(user.name)

  const [userUpdate, { data }] = useMutation<UserUpdateQuery['data'], UserUpdateQuery['vars']>(USER_UPDATE_QUERY, {
    refetchQueries: ['UserQuery'],
  })

  const update = (ev: React.FormEvent): void => {
    ev.preventDefault()
    userUpdate({ variables: { user: { name } } })
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
          <Label htmlFor="password">Name</Label>
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
            <Input type="text" value={name} onChange={setString(setName)} />
          </Box>
        </Box>

        <Box>
          <Button
            onClick={update}
            sx={{
              textAlign: 'center',
              width: '100%',
            }}
          >
            Update Profile
          </Button>
        </Box>
        {!!data && <Text mt={4}>Update successful!</Text>}
      </Box>
    </Box>
  )
}
export default UserUpdate
