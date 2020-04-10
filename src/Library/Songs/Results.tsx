import React, { useEffect, useState } from 'react'
import { Box } from 'rebass'
import { Checkbox, Label } from '@rebass/forms'
import { useLazyQuery } from '@apollo/react-hooks'
import { useDebounce } from 'use-debounce'

import { useSearchContext } from '../SearchContextProvider'
import { useTagsContext } from '../TagsContextProvider'
import { SongsQuery, Song as SongType, SONGS_QUERY } from '../graphql'

type ResultProps = {
  result: SongType
}
const Result: React.FC<ResultProps> = ({ result }) => {
  const { activeTag, addSong, removeSong, modifyTags, songsToAdd, songsToRemove } = useTagsContext()
  const { activeSongId, setActiveSongId } = useSearchContext()

  const selectSong = (): void => setActiveSongId(result.id)
  const toggleTag = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    if (ev.target.checked) {
      addSong(result.id)
    } else {
      removeSong(result.id)
    }
  }

  const existingTag = !!result.tags.find(t => t.id === activeTag?.id)
  const checked =
    (existingTag && !songsToRemove.find(s => s === result.id)) ||
    (!existingTag && !!songsToAdd.find(s => s === result.id))

  return (
    <Box
      as="li"
      sx={{
        alignItems: 'center',
        borderRadius: 3,
        display: 'flex',
        listStyle: 'none',
        mx: 0,
        my: 2,
        px: 2,
        py: 3,
        bg: activeSongId === result.id ? 'accent' : 'initial',
        cursor: 'pointer',
        '&:hover': {
          bg: '#4A5568',
        },
      }}
      onClick={selectSong}
    >
      <Box
        display="flex"
        sx={{
          alignItems: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          ml: 3,
        }}
      >
        <Box>
          <Label sx={{ m: 0, visibility: modifyTags ? 'visible' : 'hidden' }}>
            <Checkbox checked={checked} onChange={toggleTag} sx={{ cursor: 'pointer' }} />
          </Label>
        </Box>
        <Box>{result.name}</Box>
      </Box>
    </Box>
  )
}

const Songs: React.FC = () => {
  const { query } = useSearchContext()
  const [debouncedQuery] = useDebounce(query, 500)
  const [results, setResults] = useState<SongType[]>([])
  const [searchLibrary, { data }] = useLazyQuery<SongsQuery['data'], SongsQuery['vars']>(SONGS_QUERY, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (!data) {
      return
    }

    setResults(data.songs)
  }, [data, setResults])

  useEffect(() => {
    searchLibrary({ variables: { query: debouncedQuery } })
  }, [debouncedQuery, searchLibrary])

  if (results.length === 0) {
    return <></>
  }

  const resultItems = results.map(result => <Result key={result.id} result={result} />)
  return (
    <Box
      as="ul"
      sx={{
        m: 0,
        overflow: 'scroll',
        p: 0,
        position: 'relative',
      }}
    >
      {resultItems}
    </Box>
  )
}

export default Songs
