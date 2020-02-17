import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { Box, Button } from 'rebass'
import { Input, Label } from '@rebass/forms'

import Container from 'components/Container'
import { AuthContext } from 'App'

import { TEAM_CREATE, TeamCreate } from './graphql'

// TODO: move to lib and perhaps rename?
type SetFromEvent = (changeFn: (v: string) => void) => (ev: React.ChangeEvent<HTMLInputElement>) => void
const setFromEvent: SetFromEvent = changeFn => ev => changeFn(ev.target.value)

const Signup: React.FC = () => {
  const [team, setTeam] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const { setToken } = useContext(AuthContext)
  const history = useHistory()

  // const [teamCreate, { data, loading }] = useMutation<TeamCreate['data'], TeamCreate['vars']>(TEAM_CREATE)
  const [teamCreate, { data }] = useMutation<TeamCreate['data'], TeamCreate['vars']>(TEAM_CREATE)

  const attemptSignup = (ev: React.FormEvent): void => {
    ev.preventDefault()
    teamCreate({ variables: { teamName: team, teamOwner: { name, email, password } } })
  }

  useEffect(() => {
    if (!data || !setToken) {
      return
    }
    setErrors(data.teamCreate.errors)

    if (!!data.teamCreate.accessToken) {
      setToken(data.teamCreate.accessToken)
      localStorage.setItem('musicbox-token', data.teamCreate.accessToken)
      history.push('/home')
    }
  }, [data, history, setToken])

  return (
    <Container>
      <Box bg="accent" p={4} my={4} sx={{ borderRadius: 4 }}>
        <Box pb={4}>
          <Label>Team</Label>
          <Input value={team} onChange={setFromEvent(setTeam)} />
        </Box>

        <Box pb={4}>
          <Label>Name</Label>
          <Input value={name} onChange={setFromEvent(setName)} />
        </Box>

        <Box pb={4}>
          <Label>Email</Label>
          <Input value={email} onChange={setFromEvent(setEmail)} />
        </Box>

        <Box pb={4}>
          <Label>Password</Label>
          <Input value={password} onChange={setFromEvent(setPassword)} />
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
