import React from 'react'
import { Box } from 'rebass'
import { Plus } from 'react-feather'

import { Result } from './types'
import { useResultsContext } from './ResultsContextProvider'

const SearchResult: React.FC<{ result: Result }> = ({ result }) => {
  const { selectResult } = useResultsContext()
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
        <SearchResult key={result.id} result={result} />
      ))}
    </Box>
  )
}

export default Results
