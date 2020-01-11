import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import { SongType } from 'lib/apiTypes'

const SONGS_QUERY = gql`
  query SongsQuery {
    songs {
      id
      name
    }
  }
`

type LocalSongType = Pick<SongType, 'id' | 'name'>
type SongsQuery = {
  songs: LocalSongType[]
}

const Library: React.FC = () => {
  const { data, loading } = useQuery<SongsQuery>(SONGS_QUERY)

  if (loading) {
    return <p>Loading...</p>
  }

  const songs = data?.songs.map(s => <li key={s.id}>{s.name}</li>)
  return <ul>{songs}</ul>
}

export default Library
