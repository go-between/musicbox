import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Box } from 'rebass'
import { Plus } from 'react-feather'

import { PlaylistRecordContext } from 'Room'

import { SongsQuery, SONGS_QUERY } from './graphql'

const LibraryResult: React.FC<{ id: string; title: string }> = ({ id, title }) => {
  const { addRecord } = useContext(PlaylistRecordContext)
  const enqueueSong = (): void => addRecord(id)

  return (
    <Box
      as="li"
      sx={{
        alignItems: 'center',
        borderBottom: '1px solid',
        borderColor: 'muted',
        display: 'flex',
        justifyContent: 'space-between',
        listStyle: 'none',
        mx: 0,
        my: 3,
        pb: 3,
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
        <Plus size={18} onClick={enqueueSong} />
      </Box>
    </Box>
  )
}

const LibraryResults: React.FC<{ query: string }> = ({ query }) => {
  const { data, loading } = useQuery<SongsQuery['data'], SongsQuery['vars']>(SONGS_QUERY, {
    fetchPolicy: 'network-only',
    variables: { query },
  })

  if (loading) {
    return <p>Loading...</p>
  }

  if (!data) {
    return <div />
  }

  return (
    <Box
      as="ul"
      sx={{
        m: 0,
        p: 0,
      }}
    >
      {data.songs.map(song => (
        <LibraryResult key={song.id} id={song.id} title={song.name} />
      ))}
    </Box>
  )
}

export default LibraryResults
