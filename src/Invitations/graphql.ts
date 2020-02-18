import gql from 'graphql-tag'

// Queries & Mutations
export type InvitationCreate = {
  data: {
    invitationCreate: {
      errors: []
    }
  }
  vars: {
    name: string
    email: string
  }
}

export const INVITATION_CREATE = gql`
  mutation InvitationCreate($email: String!, $name: String!) {
    invitationCreate(input: { email: $email, name: $name }) {
      errors
    }
  }
`

export type InvitationsQuery = {
  data: {
    invitations: Invitation[]
  }
  vars: {}
}

export const INVITATIONS_QUERY = gql`
  query InvitationsQuery {
    invitations {
      email
      name
      invitationState
    }
  }
`

// Entities
export type Invitation = {
  email: string
  name: string
  invitationState: 'pending' | 'accepted'
}
