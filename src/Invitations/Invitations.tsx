import React, { useState } from 'react'
import { Box, Button } from 'rebass'
import { Label, Input } from '@rebass/forms'
import { useMutation, useQuery } from '@apollo/react-hooks'

import { setString } from 'lib/setters'

import { INVITATION_CREATE, INVITATIONS_QUERY, InvitationCreate, InvitationsQuery, Invitation } from './graphql'

const InvitationPartial: React.FC<Invitation> = ({ email, name, invitationState }) => {
  const [resentInvitation, setResentInvitation] = useState(false)
  const [resendInvitationMutation] = useMutation<InvitationCreate['data'], InvitationCreate['vars']>(
    INVITATION_CREATE,
    { onCompleted: () => setResentInvitation(true) },
  )

  const resendInvitation = (): void => {
    resendInvitationMutation({ variables: { email, name } })
  }

  const resendPartial = resentInvitation ? 'Sent!' : <Button onClick={resendInvitation}>Resend</Button>
  return (
    <Box as="li">
      {name} ({email}) {invitationState === 'pending' && resendPartial}
    </Box>
  )
}

const Invitations: React.FC = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const { loading, data } = useQuery<InvitationsQuery['data']>(INVITATIONS_QUERY)

  const clearInvitation = (): void => {
    setEmail('')
    setName('')
  }

  const [sendInvitationMutation] = useMutation<InvitationCreate['data'], InvitationCreate['vars']>(INVITATION_CREATE, {
    onCompleted: clearInvitation,
  })
  const sendInvitation = (): void => {
    sendInvitationMutation({ variables: { email, name }, refetchQueries: ['InvitationsQuery'] })
  }

  if (loading || !data) {
    return <p>Loading</p>
  }

  return (
    <Box>
      <Box>
        <Label>My Invitations</Label>
        <Box as="ul">
          {data.invitations.map(i => (
            <InvitationPartial key={i.email} {...i} />
          ))}
        </Box>
        <Label>Send New Invitation</Label>
        <Label>Name</Label>
        <Input value={name} onChange={setString(setName)} />
        <Label>Email</Label>
        <Input value={email} onChange={setString(setEmail)} />
        <Button onClick={sendInvitation}>Send!</Button>
      </Box>
    </Box>
  )
}

export { Invitations }
