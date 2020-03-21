import React, { createRef, useEffect } from 'react'
import { Box, Text } from 'rebass'
import { Plus, CheckCircle } from 'react-feather'

import { usePlaylistRecordContext } from 'Room/PlaylistRecordContextProvider'
import { useCurrentRecordContext } from 'Room/CurrentRecordContextProvider'

import { Result } from './types'
import { useResultsContext } from './ResultsContextProvider'

type SearchResultProps = {
  alreadyAdded: boolean
  result: Result
  selectResult: (result: Result) => void
  selected: boolean
  nowPlaying: boolean
}
const SearchResult: React.FC<SearchResultProps> = ({ alreadyAdded, nowPlaying, result, selectResult, selected }) => {
  const onClick = (): void => selectResult(result)

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
        bg: `${selected ? '#4A5568' : 'initial'}`,
        '&:hover': {
          bg: '#4A5568',
        },
      }}
    >
      {nowPlaying ? <Text>now playing</Text> : <></>}

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
        {result.name}
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
        }}
      >
        {alreadyAdded ? <CheckCircle size={18} /> : <Plus size={18} />}
      </Box>
    </Box>
  )
}

const FloatingResults: React.FC = ({ children }) => {
  return (
    <Box
      sx={{
        bg: 'accent',
        borderRadius: 4,
        position: 'absolute',
        top: '105%',
        left: 0,
        right: 0,
        maxHeight: '400px',
        overflow: 'scroll',
        px: 3,
        transition: 'all 2s ease-in',
      }}
    >
      {children}
    </Box>
  )
}

const Results: React.FC = () => {
  const { results, error, selectResult, resultIndex } = useResultsContext()
  const { playlistRecords } = usePlaylistRecordContext()
  const { currentRecord } = useCurrentRecordContext()

  const resultsRef = createRef<HTMLUListElement>()
  const selectedRef = createRef<HTMLDivElement>()
  const resultItems = results.map((result, idx) => {
    const alreadyAdded =
      !!playlistRecords.find(record => record.song.id === result.id) || currentRecord?.song.id === result.id
    const nowPlaying = currentRecord?.song.id === result.id

    if (idx === resultIndex) {
      return (
        <Box key={result.id} ref={selectedRef}>
          <SearchResult
            result={result}
            nowPlaying={nowPlaying}
            selectResult={selectResult}
            selected={true}
            alreadyAdded={alreadyAdded}
          />
        </Box>
      )
    }

    return (
      <SearchResult
        key={result.id}
        nowPlaying={nowPlaying}
        result={result}
        selectResult={selectResult}
        selected={false}
        alreadyAdded={alreadyAdded}
      />
    )
  })

  useEffect(() => {
    if (!resultsRef?.current?.parentElement || !selectedRef?.current) {
      return
    }

    const parent = resultsRef.current.parentElement
    const parentStyles = window.getComputedStyle(parent)
    const height = parseInt(parentStyles.getPropertyValue('height'))
    const selectedStyles = window.getComputedStyle(selectedRef.current)
    const selectedHeight = parseInt(selectedStyles.getPropertyValue('height'))

    if (selectedRef.current.offsetTop > height + parent.scrollTop - selectedHeight) {
      parent.scrollTop = selectedRef.current.offsetTop
    } else if (selectedRef.current.offsetTop < parent.scrollTop) {
      parent.scrollTop = parent.scrollTop - height
    }
  }, [resultIndex, resultsRef, selectedRef])

  if (!!error) {
    return <Box p={3}>{error}</Box>
  }

  if (results.length === 0) {
    return <></>
  }

  return (
    <FloatingResults>
      <Box
        ref={resultsRef}
        as="ul"
        sx={{
          m: 0,
          p: 0,
        }}
      >
        {resultItems}
      </Box>
    </FloatingResults>
  )
}

export default Results
