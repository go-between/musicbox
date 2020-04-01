import gql from 'graphql-tag'

export type SongsQuery = {
  data: {
    songs: Song[]
  }
  vars: {
    query: string
  }
}

export const SONGS_QUERY = gql`
  query LibrarySongsQuery($query: String) {
    songs(query: $query) {
      id
      name
      youtubeId
      tags {
        id
        name
      }
    }
  }
`

export type TagCreate = {
  data: {}
  vars: {
    name: string
  }
}

export const TAG_CREATE = gql`
  mutation TagCreate($name: String!) {
    tagCreate(input: { name: $name }) {
      errors
    }
  }
`

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

export type Song = {
  id: string
  name: string
  youtubeId: string
  tags: Tag[]
}

export type Tag = {
  id: string
  name: string
}
