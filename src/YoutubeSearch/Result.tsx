import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Box, Flex } from 'rebass'
import { Plus } from 'react-feather'

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
      <Box
        as="span"
        sx={{
          fontSize: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          mr: 2,
        }}
      >
        {result.title}
      </Box>

      <Box
        onClick={onClick}
        sx={{
          alignItems: 'center',
          bg: 'accent',
          borderRadius: 4,
          color: 'text',
          cursor: 'pointer',
          display: 'flex',
          p: 1,
          mx: 1,
          '&:hover': {
            bg: 'muted',
          }
        }}
      >
        <Plus size={18} />
      </Box>
    </>
  )
}

export default Result
