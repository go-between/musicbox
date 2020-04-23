import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { useQueryParams } from 'lib/useQueryParams'

import ExistingUserInvitation from './ExistingUserInvitation'
import NewUserInvitation from './NewUserInvitation'
import { INVITATION_QUERY, InvitationQuery } from './graphql'

const Invitation: React.FC = () => {
  const params = useQueryParams()
  const token = params.get('token') || ''
  const email = params.get('email') || ''

  const { loading, data } = useQuery<InvitationQuery['data'], InvitationQuery['vars']>(INVITATION_QUERY, {
    variables: { email, token },
    fetchPolicy: 'network-only',
  })

  if (loading || !data) {
    return <p>Loading</p>
  }

  if (!data.invitation) {
    return <p>Not a valid invitation!</p>
  }

  if (data.invitation.invitationState === 'accepted') {
    return <p>You&apos;ve already accepted this invitation. Nice!</p>
  }

  if (data.invitation.invitedUser) {
    return <ExistingUserInvitation invitation={data.invitation} token={token} />
  }

  return <NewUserInvitation invitation={data.invitation} token={token} />
}

export default Invitation
