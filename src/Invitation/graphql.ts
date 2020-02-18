import gql from 'graphql-tag'

// Queries & Mutations
export type InvitationQuery = {
  data: {
    invitation: PendingInvitation
  }
  vars: {
    email: string
    token: string
  }
}

export const INVITATION_QUERY = gql`
  query InvitationQuery($email: String!, $token: ID!) {
    invitation(email: $email, token: $token) {
      email
      name
      invitationState
      team {
        name
      }
      invitingUser {
        name
      }
    }
  }
`

export type InvitationAccept = {
  data: {
    invitationAccept: {
      accessToken: string
      errors: string[]
    }
  }
  vars: {
    email: string
    name: string
    token: string
    password: string
  }
}

export const INVITATION_ACCEPT = gql`
  mutation InvitationAccept($email: String!, $password: String!, $token: ID!, $name: String!) {
    invitationAccept(input: { invitation: { email: $email, password: $password, token: $token, name: $name } }) {
      accessToken
      errors
    }
  }
`

// Entities
export type PendingInvitation = {
  email: string
  name: string
  invitationState: 'pending' | 'accepted'
  team: {
    name: string
  }
  invitingUser: {
    name: string
  }
}
