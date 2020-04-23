import gql from 'graphql-tag'

export type UserPasswordUpdate = {
  data: {
    userPasswordUpdate: {
      errors: string[]
    }
  }
  vars: {
    password: string
    newPassword: string
  }
}

export const USER_PASSWORD_UPDATE = gql`
  mutation UserPasswordUpdate($password: String!, $newPassword: String!) {
    userPasswordUpdate(input: { password: $password, newPassword: $newPassword }) {
      errors
    }
  }
`

export type UserUpdateQuery = {
  data: {
    userUpdate: {
      errors: string[]
    }
  }
  vars: {
    user: {
      name: string
    }
  }
}

export const USER_UPDATE_QUERY = gql`
  mutation UserUpdate($user: UserUpdateInputObject!) {
    userUpdate(input: { user: $user }) {
      user {
        name
      }
      errors
    }
  }
`
