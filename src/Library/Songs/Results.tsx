import React, { useEffect, useState } from 'react'
import { Box, Flex } from 'rebass'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { useDebounce } from 'use-debounce'
import { Tag as TagIcon } from 'react-feather'

import { useSearchContext } from '../SearchContextProvider'
import { useTagsContext } from '../TagsContextProvider'
import { SongsQuery, TagToggle, Song as SongType, Tag as TagType, SONGS_QUERY, TAG_TOGGLE } from '../graphql'

type TagButtonProps = {
  hasTag: boolean
}
const TagButton: React.FC<TagButtonProps> = ({ hasTag }) => {
  const icon = hasTag ? <TagIcon size={16} color="#5A67D8" fill="#5A67D8" /> : <TagIcon size={16} />
  const wording = hasTag ? 'Tagged' : 'Untagged'

  return (
    <Flex
      sx={{
        alignItems: 'center',
        flexDirection: 'row',
        minWidth: '80px',
        justifyContent: 'space-between',
      }}
    >
      <Box mr={1}>{icon}</Box>
      <Box fontSize={12}>{wording}</Box>
    </Flex>
  )
}

const TagList: React.FC<{ tags: TagType[] }> = ({ tags }) => {
  const tagItems = tags.map(t => (
    <Box
      key={t.id}
      as="li"
      sx={{
        listStyle: 'none',
      }}
    >
      {t.name}
    </Box>
  ))

  return (
    <Box
      as="ul"
      sx={{
        m: 0,
        p: 0,
      }}
    >
      {tagItems}
    </Box>
  )
}

type ResultProps = {
  activeTag: TagType | null
  result: SongType
  tagResult: (songId: string) => void
}
const Result: React.FC<ResultProps> = ({ activeTag, result, tagResult }) => {
  const addTag = (): void => tagResult(result.id)
  const hasTag = !!result.tags.find(tag => tag.id === activeTag?.id)

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
        '&:hover': {
          bg: '#4A5568',
        },
      }}
    >
      <Box
        onClick={addTag}
        sx={{
          borderColor: 'accent',
          border: '1px solid',
          borderRadius: 4,
          p: 1,
          position: 'relative',
          cursor: !!activeTag ? 'pointer' : 'inherit',
          '&:hover > *': { visibility: 'visible' },
        }}
      >
        <TagButton hasTag={hasTag} />
        <Box
          sx={{
            visibility: 'hidden',
            position: 'absolute',
            zIndex: 100,
            width: '200px',
            left: '110%',
            top: 0,
            bg: 'accent',
            p: 2,
          }}
        >
          <TagList tags={result.tags} />
        </Box>
      </Box>
      <Box
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          ml: 3,
        }}
      >
        {result.name}
      </Box>
    </Box>
  )
}

const Songs: React.FC = () => {
  const { query } = useSearchContext()
  const { activeTag } = useTagsContext()
  const [debouncedQuery] = useDebounce(query, 500)
  const [results, setResults] = useState<SongType[]>([])
  const [searchLibrary, { data }] = useLazyQuery<SongsQuery['data'], SongsQuery['vars']>(SONGS_QUERY, {
    fetchPolicy: 'network-only',
  })

  const [tagToggleMutation] = useMutation<TagToggle['data'], TagToggle['vars']>(TAG_TOGGLE)
  const tagResult = (songId: string): void => {
    if (!activeTag) {
      return
    }

    tagToggleMutation({ variables: { songId, tagId: activeTag.id }, refetchQueries: ['LibrarySongsQuery'] })
  }

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

  const resultItems = results.map(result => (
    <Result key={result.id} activeTag={activeTag} result={result} tagResult={tagResult} />
  ))
  return (
    <Box
      as="ul"
      sx={{
        m: 0,
        p: 0,
      }}
    >
      {resultItems}
    </Box>
  )
}

export default Songs
