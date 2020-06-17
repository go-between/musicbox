import gql from 'graphql-tag'

// Queries & Mutations
export type TagsQuery = {
  data: {
    tags: Tag[]
  }
  vars: {}
}

export const TAGS_QUERY = gql`
  query Tags {
    tags {
      id
      name
    }
  }
`

// Entities
export type Tag = {
  id: string
  name: string
}
