import React, { useState } from 'react'
import { Box, Button, Heading } from 'rebass'
import { Label, Input } from '@rebass/forms'
import { Mail, User } from 'react-feather'
import { useMutation, useQuery } from '@apollo/react-hooks'

import { setString } from 'lib/setters'

import { INVITATION_CREATE, INVITATIONS_QUERY, InvitationCreate, InvitationsQuery, Invitation } from './graphql'

import { Container } from 'components'

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

  const { loading, data } = useQuery<InvitationsQuery['data']>(INVITATIONS_QUERY, { fetchPolicy: 'network-only' })

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
    <Container>
      <Box mt={4}>
        <Heading as="h2" mb={3} fontSize={[4, 6]}>
          New Invitations
        </Heading>
      </Box>

      <Box
        sx={{
          borderRadius: 4,
          boxShadow: 'xl',
          maxWidth: 400,
        }}
        bg="accent"
        p={4}
      >
        <Box as="ul">
          {data.invitations.map(i => (
            <InvitationPartial key={i.email} {...i} />
          ))}
        </Box>

        <Box mb={4}>
          <Label htmlFor="name">Name</Label>
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
            <User color="#4A5568" size={20} />
            <Input value={name} onChange={setString(setName)} />
          </Box>
        </Box>

        <Box mb={4}>
          <Label htmlFor="email">Email</Label>
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
            <Input value={email} onChange={setString(setEmail)} />
          </Box>
        </Box>

        <Button onClick={sendInvitation}>Send Invite</Button>
      </Box>
    </Container>
  )
}

export { Invitations }
