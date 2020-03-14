import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { useDebounce } from 'use-debounce'
import { Box, Flex } from 'rebass'
import { Input, Select } from '@rebass/forms'
import { Search } from 'react-feather'

import { setString } from 'lib/setters'

import Results from './Results'
import { Result, YoutubeResults } from './types'
import { deserialize, search } from './youtube'
import { SongsQuery, SONGS_QUERY } from './graphql'

const ResultsContainer: React.FC<{ error: string; results: Result[] }> = ({ error, results }) => {
  if (results.length === 0) {
    return <></>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <Box
      sx={{
        bg: 'accent',
        borderRadius: 4,
        position:'absolute',
        top: '105%',
        left: 0,
        right: 0,
        maxHeight: '400px',
        overflow: 'scroll',
        px: 3,
        transition: 'all 2s ease-in'
      }}
    >
      <Results results={results} />
    </Box>
  )
}

export const QuickAdd: React.FC = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [error, setError] = useState('')
  const [searchSelection, setSearchSelection] = useState('library')
  const [debouncedQuery] = useDebounce(query, 500)
  const [searchLibrary] = useLazyQuery<SongsQuery['data'], SongsQuery['vars']>(SONGS_QUERY, {
    fetchPolicy: 'network-only',
    onCompleted: data => {
      const libraryResults: Result[] = data.songs.map(song => {
        return {
          id: song.id,
          name: song.name,
          resultType: 'library',
        }
      })

      setResults(libraryResults)
    },
  })

  useEffect(() => {
    setResults([])
    setError('')

    if (debouncedQuery.length === 0) {
      return
    }

    if (searchSelection === 'library') {
      searchLibrary({ variables: { query: debouncedQuery } })
    } else {
      search(query).then(response => {
        if (response.status !== 200) {
          setError('Sorry, YouTube search is temporarily unavailable.  Try adding some songs from your library!')
          return
        }
        response.json().then((body: YoutubeResults) => {
          setResults(deserialize(body))
        })
      })
    }
  }, [debouncedQuery, query, searchLibrary, searchSelection])

  return (
    <Box sx={{ position: 'relative' }}>
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 4,
          mb: 4,
        }}
      >
        <Flex sx={{ borderRadius: 6 }} bg="accent" width="100%" px={3} py={2} alignItems="center" justifyContent="space-between">
          <Flex
            sx={{
              alignItems: 'center',
              width: ['65%', '70%', '75%']
            }}
          >
            <Search />
            <Input
              type="text"
              value={query}
              onChange={setString(setQuery)}
              sx={{
                bg: 'accent',
                boxShadow: 'none',

              }}
            />
          </Flex>

          <Box
            sx={{
              width: ['35%', '30%', '25%']
            }}
          >
            <Select
              defaultValue="library"
              sx={{ bg: 'background', borderRadius: 4, borderColor: 'transparent' }}
              onChange={setString(setSearchSelection)}
            >
              <option value="library">My Library</option>
              <option value="youtube">Youtube</option>
            </Select>
          </Box>
        </Flex>
      </Flex>

      <ResultsContainer results={results} error={error} />
    </Box>
  )
}

export default QuickAdd
