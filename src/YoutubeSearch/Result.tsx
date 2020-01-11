import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { ParsedResult } from './types'

const SONG_CREATE = gql`
  mutation SongCreate($youtubeId: ID!) {
    songCreate(input: { youtubeId: $youtubeId }) {
      errors
    }
  }
`

type Props = {
  result: ParsedResult
}
const Result: React.FC<Props> = ({ result }) => {
  const [teamActivate] = useMutation(SONG_CREATE)

  const onClick = (): void => {
    teamActivate({ variables: { youtubeId: result.id }, refetchQueries: ['SongsQuery'] })
  }

  return (
    <>
      <p>{result.title}</p>
      <button onClick={onClick}>Add Song</button>
    </>
  )
}

export default Result
