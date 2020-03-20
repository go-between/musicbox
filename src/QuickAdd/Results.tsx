import React, { createRef, useEffect } from 'react'
import { Box } from 'rebass'
import { Plus } from 'react-feather'

import { Result } from './types'
import { useResultsContext } from './ResultsContextProvider'

type SearchResultProps = {
  result: Result
  selectResult: (result: Result) => void
  selected: boolean
}
const SearchResult: React.FC<SearchResultProps> = ({ result, selectResult, selected }) => {
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
        <Plus size={18} />
      </Box>
    </Box>
  )
}

const Results: React.FC = () => {
  const { results, error, selectResult, resultIndex } = useResultsContext()

  const resultsRef = createRef<HTMLUListElement>()
  const selectedRef = createRef<HTMLDivElement>()
  const resultItems = results.map((result, idx) => {
    if (idx === resultIndex) {
      return (
        <Box key={result.id} ref={selectedRef}>
          <SearchResult result={result} selectResult={selectResult} selected={true} />
        </Box>
      )
    }

    return <SearchResult key={result.id} result={result} selectResult={selectResult} selected={false} />
  })

  useEffect(() => {
    if (!resultsRef?.current?.parentElement || !selectedRef?.current) {
      return
    }

    const parent = resultsRef.current.parentElement
    const parentStyles = window.getComputedStyle(parent)
    const height = parseInt(parentStyles.getPropertyValue('max-height'))

    if (selectedRef.current.offsetTop > height + parent.scrollTop) {
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
  )
}

export default Results
