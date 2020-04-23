import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { Box, Button } from 'rebass'
import { Input, Label } from '@rebass/forms'

import { useAuthContext } from 'Context'
import { setString } from 'lib/setters'
import { Container } from 'components'

import { TEAM_CREATE, TeamCreate } from './graphql'

const Signup: React.FC = () => {
  const [team, setTeam] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const { setToken } = useAuthContext()
  const history = useHistory()

  const [teamCreate, { data }] = useMutation<TeamCreate['data'], TeamCreate['vars']>(TEAM_CREATE)

  const attemptSignup = (ev: React.FormEvent): void => {
    ev.preventDefault()
    teamCreate({ variables: { teamName: team, teamOwner: { name, email, password } } })
  }

  useEffect(() => {
    if (!data) {
      return
    }
    setErrors(data.teamCreate.errors)

    if (!!data.teamCreate.accessToken) {
      setToken(data.teamCreate.accessToken)
      history.push('/rooms')
    }
  }, [data, history, setToken])

  return (
    <Container>
      <Box bg="accent" p={4} my={4} sx={{ borderRadius: 4 }}>
        <Box pb={4}>
          <Label>Team</Label>
          <Input value={team} onChange={setString(setTeam)} />
        </Box>

        <Box pb={4}>
          <Label>Name</Label>
          <Input value={name} onChange={setString(setName)} />
        </Box>

        <Box pb={4}>
          <Label>Email</Label>
          <Input value={email} onChange={setString(setEmail)} />
        </Box>

        <Box pb={4}>
          <Label>Password</Label>
          <Input value={password} onChange={setString(setPassword)} />
        </Box>

        <Box pb={4}>
          <Button onClick={attemptSignup}>Sign Up!</Button>
        </Box>

        <Box>{errors.join(',')}</Box>
      </Box>
    </Container>
  )
}

export { Signup }
