import React from 'react'
import { Box } from 'rebass'
import { Plus } from 'react-feather'

import { Result } from './types'
import { useResultsContext } from './ResultsContextProvider'

type SearchResultProps = {
  result: Result
  selectResult: (result: Result) => void
}
const SearchResult: React.FC<SearchResultProps> = ({ result, selectResult }) => {
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
  const { results, error, selectResult } = useResultsContext()

  if (!!error) {
    return <Box p={3}>{error}</Box>
  }

  if (results.length === 0) {
    return <></>
  }

  return (
    <Box
      as="ul"
      sx={{
        m: 0,
        p: 0,
      }}
    >
      {results.map(result => (
        <SearchResult key={result.id} result={result} selectResult={selectResult} />
      ))}
    </Box>
  )
}

export default Results
