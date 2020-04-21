import gql from 'graphql-tag'

export type RecordListenCreate = {
  data: {
    recordListenCreate: {
      recordListen: {
        approval: number
      }
    }
  }
  vars: {
    recordId: string
    approval: number
  }
}

export const RECORD_LISTEN_CREATE = gql`
  mutation RecordListenCreate($recordId: ID!, $approval: Int!) {
    recordListenCreate(input: { recordId: $recordId, approval: $approval }) {
      recordListen {
        id
        approval
      }
      errors
    }
  }
`

export type RecordListensQuery = {
  data: {
    recordListens: RecordListen[]
  }
  vars: {
    recordId: string
  }
}

export const RECORD_LISTENS = gql`
  query RecordListens($recordId: ID!) {
    recordListens(recordId: $recordId) {
      approval
      user {
        id
        email
        name
      }
    }
  }
`

export type RecordListen = {
  approval: number
  user: {
    id: string
    email: string
    name: string
  }
}
