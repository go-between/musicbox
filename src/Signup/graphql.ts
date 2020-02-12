import gql from 'graphql-tag'

export type TeamCreate = {
  data: {
    teamCreate: {
      accessToken: string
      errors: string[]
    }
  }
  vars: {
    teamName: string
    teamOwner: {
      name: string
      email: string
      password: string
    }
  }
}
export const TEAM_CREATE = gql`
  mutation TeamCreate($teamOwner: TeamOwnerInputObject!, $teamName: String!) {
    teamCreate(input:{
      teamOwner: $teamOwner,
      teamName: $teamName
    }) {
      accessToken
      errors
    }
  }
`