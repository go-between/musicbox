import React, { useEffect, useState } from 'react'
import { Box, Button, Heading, Text } from 'rebass'
import { Label, Input } from '@rebass/forms'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import { useAuthContext } from 'Context'
import { setString } from 'lib/setters'

import { INVITATION_ACCEPT, InvitationAccept, PendingInvitation } from './graphql'

type Props = {
  token: string
  invitation: PendingInvitation
}
const ExistingUserInvitation: React.FC<Props> = ({ invitation, token }) => {
  const { email } = invitation
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  const [invitationAcceptMutation, { data: invitationData }] = useMutation<
    InvitationAccept['data'],
    InvitationAccept['vars']
  >(INVITATION_ACCEPT)
  const { setToken } = useAuthContext()
  const history = useHistory()

  const acceptInvitation = (): void => {
    setErrors([])
    invitationAcceptMutation({ variables: { token, email, password } })
  }

  useEffect(() => {
    if (!invitationData) {
      return
    }

    const { errors, accessToken } = invitationData.invitationAccept

    if (errors?.length > 0) {
      setErrors(errors)
    }

    if (accessToken) {
      setToken(accessToken)
      history.push('/home')
    }
  }, [history, invitationData, setToken])

  return (
    <Box bg="accent" p={4} mt={6} sx={{ borderRadius: 4, width: '600px', mx: 'auto' }}>
      <Heading mb={4}>Hey {invitation.invitedUser?.name}!</Heading>

      <Box mb={2}>
        <b>{invitation.invitingUser.name}</b> invited you to their team <b>{invitation.team.name}</b>!
      </Box>

      <Box mb={2}>
        You&apos;ve been invited at the email: <b>{invitation.email}</b>. It looks like you&apos;ve{' '}
        <b>already made an account</b> on Musicbox with this email.
      </Box>

      <Box mb={4}>
        <b>Please confirm your password</b> below in order to accept {invitation.invitingUser.name}&apos;s invite!
      </Box>

      <Box mb={4}>
        <Label>Password</Label>
        <Input type="text" value={password} onChange={setString(setPassword)} />
        <Text sx={{ fontStyle: 'italic' }}>Confirm your password above.</Text>
      </Box>

      <Box>
        <Button width="100%" onClick={acceptInvitation}>
          Join {invitation.team.name} on Musicbox.fm
        </Button>
      </Box>
      <Box>{errors.join(',')}</Box>
    </Box>
  )
}

export default ExistingUserInvitation
