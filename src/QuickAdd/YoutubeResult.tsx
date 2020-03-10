import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Box } from 'rebass'
import { Plus } from 'react-feather'

import { usePlaylistRecordContext } from 'Room'

import { SONG_CREATE, SongCreateMutation } from './graphql'
import { ParsedResult } from './types'

type Props = {
  result: ParsedResult
}
const YoutubeResult: React.FC<Props> = ({ result }) => {
  const { addRecord } = usePlaylistRecordContext()
  const enqueueSong = (data: { songCreate: { song: { id: string } } }): void => {
    addRecord(data.songCreate.song.id)
  }
  const [createSong] = useMutation<SongCreateMutation['data'], SongCreateMutation['vars']>(SONG_CREATE, {
    onCompleted: enqueueSong,
  })

  const onClick = (): void => {
    createSong({ variables: { youtubeId: result.id } })
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
          },
        }}
      >
        <Plus size={18} />
      </Box>
    </>
  )
}

export default YoutubeResult
