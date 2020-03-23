import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import { useDebounce } from 'use-debounce'
import { Box, Flex } from 'rebass'
import { Input, Select } from '@rebass/forms'
import { Search as SearchIcon, XCircle } from 'react-feather'

import { setString } from 'lib/setters'

import { useResultsContext } from './ResultsContextProvider'
import { Result, YoutubeResults } from './types'
import { deserialize, search } from './youtube'
import { SongsQuery, TagsQuery, SONGS_QUERY, TAGS_QUERY } from './graphql'

const CloseButton: React.FC<{ clear: () => void; query: string }> = ({ clear, query }) => {
  if (query.length === 0) {
    return <></>
  }
  return (
    <Flex
      onClick={clear}
      sx={{
        color: 'gray500',
        cursor: 'pointer',
        px: 2,
      }}
    >
      <XCircle size={22} />
    </Flex>
  )
}

export const Search: React.FC = () => {
  const {
    query,
    results,
    resultIndex,
    setResults,
    setError,
    setResultIndex,
    selectResult,
    setQuery,
    tags,
    setTags,
  } = useResultsContext()
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchSelection, setSearchSelection] = useState('library')
  const [debouncedQuery] = useDebounce(query, 500)
  const clear = (): void => {
    setQuery('')
    setResults([])
  }

  const { data: tagsData } = useQuery<TagsQuery['data'], TagsQuery['vars']>(TAGS_QUERY, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (!tagsData) {
      return
    }

    setTags(tagsData.tags)
  }, [tagsData, setTags])
  const selectTag = (ev: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedTags([ev.target.value])
  }

  const [searchLibrary] = useLazyQuery<SongsQuery['data'], SongsQuery['vars']>(SONGS_QUERY, {
    fetchPolicy: 'network-only',
    onCompleted: data => {
      const libraryResults: Result[] = data.songs.map(song => {
        return {
          ...song,
          resultType: 'library',
        }
      })

      setResults(libraryResults)
    },
  })

  useEffect(() => {
    setResultIndex(null)
    setResults([])
    setError('')

    if (debouncedQuery.length === 0 && selectedTags.length === 0) {
      return
    }

    if (searchSelection === 'library') {
      searchLibrary({ variables: { query: debouncedQuery, tagIds: selectedTags } })
    } else {
      search(debouncedQuery).then(response => {
        if (response.status !== 200) {
          setError('Sorry, YouTube search is temporarily unavailable.  Try adding some songs from your library!')
          return
        }
        response.json().then((body: YoutubeResults) => {
          setResults(deserialize(body).map(song => ({ ...song, youtubeId: song.id })))
        })
      })
    }
  }, [debouncedQuery, searchLibrary, searchSelection, setError, setResultIndex, setResults, selectedTags])

  const navigateResult = (ev: React.KeyboardEvent): void => {
    if (ev.key === 'ArrowUp') {
      ev.preventDefault()
      if (resultIndex === null) {
        setResultIndex(results.length - 1)
      } else {
        setResultIndex(Math.max(resultIndex - 1, 0))
      }
    } else if (ev.key === 'ArrowDown') {
      ev.preventDefault()
      if (resultIndex === null) {
        setResultIndex(0)
      } else {
        setResultIndex(Math.min(resultIndex + 1, results.length - 1))
      }
    } else if (ev.key === 'Enter' && resultIndex !== null) {
      selectResult(results[resultIndex])
    } else if (ev.key === 'Escape') {
      setQuery('')
    }
  }

  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 4,
        mb: 4,
        flexDirection: 'column',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Select
          placeholder="Select a Tag"
          sx={{ bg: 'background', borderRadius: 4, borderColor: 'transparent' }}
          onChange={selectTag}
        >
          <option key="no-tag" value="">
            Select Tag
          </option>
          {tags.map(t => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </Select>
      </Box>
      <Flex
        sx={{ borderRadius: 6 }}
        bg="accent"
        width="100%"
        px={3}
        py={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex
          sx={{
            alignItems: 'center',
            width: ['65%', '70%', '75%'],
          }}
        >
          <Flex
            sx={{
              color: 'gray500',
            }}
          >
            <SearchIcon size={22} />
          </Flex>

          <Input
            type="text"
            value={query}
            onChange={setString(setQuery)}
            onKeyDown={navigateResult}
            sx={{
              bg: 'accent',
              boxShadow: 'none',
            }}
          />
          <CloseButton clear={clear} query={debouncedQuery} />
        </Flex>

        <Box
          sx={{
            width: ['35%', '30%', '25%'],
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
  )
}

export default Search
