import React, { useEffect, useState } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks'
import { useDebounce } from 'use-debounce'
import { Box, Flex } from 'rebass'
import { Input, Select } from '@rebass/forms'
import { Search as SearchIcon, XCircle } from 'react-feather'
import { useToasts } from 'react-toast-notifications'

import { setString } from 'lib/setters'
import { usePlaylistRecordsContext } from 'Context'

import { useResultsContext } from './ResultsContextProvider'
import { SongCreateMutation, SearchQuery, TagsQuery, SONG_CREATE, SEARCH_QUERY, TAGS_QUERY } from './graphql'

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

const extractYoutubeId = (urlString: string): string | null => {
  try {
    const url = new URL(urlString)
    if (url.hostname === 'youtube.com' || url.hostname === 'www.youtube.com') {
      return url.searchParams.get('v')
    }

    return null
  } catch (TypeError) {
    return null
  }
}

export const Search: React.FC = () => {
  const {
    query,
    results,
    resultIndex,
    setResults,
    setError,
    setResultIndex,
    setQuery,
    tags,
    setTags,
  } = useResultsContext()
  const { addRecords } = usePlaylistRecordsContext()
  const { addToast } = useToasts()

  const [selectedTags, setSelectedTags] = useState<string[]>([])
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
    if (!!ev.target.value) {
      setSelectedTags([ev.target.value])
    } else {
      setSelectedTags([])
    }
  }

  const [searchLibrary] = useLazyQuery<SearchQuery['data'], SearchQuery['vars']>(SEARCH_QUERY, {
    fetchPolicy: 'network-only',
    onCompleted: data => setResults(data.search),
  })

  const [createSong] = useMutation<SongCreateMutation['data'], SongCreateMutation['vars']>(SONG_CREATE, {
    onCompleted: ({ songCreate: { song } }) => {
      addRecords(song.id)
      setQuery('')
      addToast(`Successfully added ${song.name}`, { appearance: 'success', autoDismiss: true })
    },
  })

  useEffect(() => {
    setResultIndex(null)
    setResults([])
    setError('')

    if (debouncedQuery.length === 0 && selectedTags.length === 0) {
      return
    }

    const youtubeId = extractYoutubeId(debouncedQuery)
    if (youtubeId === null) {
      searchLibrary({ variables: { query: debouncedQuery } })
    } else {
      createSong({ variables: { youtubeId } })
    }
  }, [debouncedQuery, searchLibrary, setError, setResultIndex, setResults, selectedTags, createSong])

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
      const record = results[resultIndex]
      addRecords(record.id)
      addToast(`Successfully added ${record.name}`, { appearance: 'success', autoDismiss: true })
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
      <Flex
        sx={{
          borderRadius: 6,
          '&:focus-within': {
            boxShadow: 'outline',
          },
        }}
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
            placeholder="Type to search, or paste YouTube URL"
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
      </Flex>
    </Flex>
  )
}

export default Search
