import React from 'react'
import { useMutation } from '@apollo/react-hooks'

import { SONG_CREATE, SongCreateMutation } from './graphql'
import { ParsedResult } from './types'

type Props = {
  result: ParsedResult
}
const Result: React.FC<Props> = ({ result }) => {
  const [teamActivate] = useMutation<SongCreateMutation['data'], SongCreateMutation['vars']>(SONG_CREATE)

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
