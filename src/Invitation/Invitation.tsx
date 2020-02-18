import React, { useContext, useEffect, useState } from 'react'
import { Box, Button } from 'rebass'
import { Label, Input } from '@rebass/forms'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { useLocation, useHistory } from 'react-router-dom'

import { AuthContext } from 'App'
import { setString } from 'lib/setters'

import { INVITATION_ACCEPT, INVITATION_QUERY, InvitationAccept, InvitationQuery } from './graphql'

const useQueryParams = (): URLSearchParams => {
  return new URLSearchParams(useLocation().search)
}

const Invitation: React.FC = () => {
  const params = useQueryParams()
  const token = params.get('token') || ''
  const email = params.get('email') || ''

  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  const { loading, data } = useQuery<InvitationQuery['data'], InvitationQuery['vars']>(INVITATION_QUERY, {
    variables: { email, token },
  })
  const [invitationAcceptMutation, { data: invitationData }] = useMutation<
    InvitationAccept['data'],
    InvitationAccept['vars']
  >(INVITATION_ACCEPT)
  const { setToken } = useContext(AuthContext)
  const history = useHistory()

  const acceptInvitation = (): void => {
    setErrors([])
    invitationAcceptMutation({ variables: { token, email, name, password } })
  }

  useEffect(() => {
    if (!invitationData) {
      return
    }

    const { errors, accessToken } = invitationData.invitationAccept

    if (errors?.length > 0) {
      setErrors(errors)
    }

    if (setToken && accessToken) {
      setToken(accessToken)
      localStorage.setItem('musicbox-token', accessToken)
      history.push('/home')
    }
  }, [history, invitationData, setToken])

  if (loading || !data) {
    return <p>Loading</p>
  }

  if (!data.invitation) {
    return <p>Not a valid invitation!</p>
  }

  if (data.invitation.invitationState === 'accepted') {
    return <p>You&apos;ve already accepted this invitation. Nice!</p>
  }

  return (
    <>
      <Box>
        Hey {data.invitation.name}, {data.invitation.invitingUser.name} invited you to their team{' '}
        {data.invitation.team.name}!
      </Box>

      <Box>You&apos;ve been invited at the email: {data.invitation.email}.</Box>
      <Box>
        If you&apos;ve got an account, write nonsense in for the name because it&apos;s a required field and confirm
        your password.
      </Box>
      <Box>If you don&apos;t have an account, tell us what you&apos;d like to be called and create a new password!</Box>

      <Box>
        <Label>Name</Label>
        <Input type="text" value={name} onChange={setString(setName)} />
      </Box>
      <Box>
        <Label>Password</Label>
        <Input type="text" value={password} onChange={setString(setPassword)} />
      </Box>

      <Box>
        <Button onClick={acceptInvitation}>Create!</Button>
      </Box>
      <Box>{errors.join(',')}</Box>
    </>
  )
}

export { Invitation }
