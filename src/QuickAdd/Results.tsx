import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Box } from 'rebass'
import { Plus } from 'react-feather'

import { usePlaylistRecordContext } from 'Room'

import { Result } from './types'
import { SONG_CREATE, SongCreateMutation } from './graphql'

type ResultProps = {
  id: string
  title: string
  resultType: 'youtube' | 'library'
}

const SearchResult: React.FC<ResultProps> = ({ id, title, resultType }) => {
  const { addRecord } = usePlaylistRecordContext()
  const [createSong] = useMutation<SongCreateMutation['data'], SongCreateMutation['vars']>(SONG_CREATE, {
    onCompleted: data => addRecord(data.songCreate.song.id),
  })

  const onClick = (): void => {
    if (resultType === 'library') {
      addRecord(id)
    } else {
      createSong({ variables: { youtubeId: id } })
    }
  }

  return (
    <Box
      as="li"
      onClick={onClick}
      sx={{
        alignItems: 'center',
        borderRadius: 3,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        listStyle: 'none',
        mx: 0,
        my: 2,
        px: 2,
        py: 3,
        '&:hover': {
          bg: '#4A5568'
        }
      }}
    >
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
        {title}
      </Box>

      <Box
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
    </Box>
  )
}

const Results: React.FC<{ results: Result[] }> = ({ results }) => {
  return (
    <Box
      as="ul"
      sx={{
        m: 0,
        p: 0,
      }}
    >
      {results.map(result => (
        <SearchResult key={result.id} id={result.id} title={result.name} resultType={result.resultType} />
      ))}
    </Box>
  )
}

export default Results
