import gql from 'graphql-tag'

export type LibraryRecordsQuery = {
  data: {
    libraryRecords: LibraryRecord[]
  }
  vars: {
    query: string
  }
}

export const LIBRARY_RECORDS_QUERY = gql`
  query LibraryLibraryRecordsQuery($query: String) {
    libraryRecords(query: $query) {
      id
      source
      createdAt
      fromUser {
        id
        name
        email
      }
      song {
        id
        durationInSeconds
        name
        youtubeId
        thumbnailUrl
      }
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

export type TagToggle = {
  data: {}
  vars: {
    tagId: string
    addSongIds: string[]
    removeSongIds: string[]
  }
}

export const TAG_TOGGLE = gql`
  mutation TagToggle($tagId: ID!, $addSongIds: [ID!]!, $removeSongIds: [ID!]!) {
    tagToggle(input: { tagId: $tagId, addSongIds: $addSongIds, removeSongIds: $removeSongIds }) {
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

export type RemoveFromLibrary = {
  data: {}
  vars: {
    id: string
  }
}

export const REMOVE_FROM_LIBRARY = gql`
  mutation LibraryRecordDelete($id: ID!) {
    libraryRecordDelete(input: { id: $id }) {
      errors
    }
  }
`

export type LibraryRecord = {
  id: string
  source: string
  createdAt: string
  fromUser: {
    name: string
    email: string
  }
  song: Song
  tags: Tag[]
}

export type Song = {
  id: string
  durationInSeconds: number
  name: string
  thumbnailUrl: string
  youtubeId: string
}

export type Tag = {
  id: string
  name: string
}
