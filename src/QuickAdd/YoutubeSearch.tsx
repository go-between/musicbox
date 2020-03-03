import React, { useState, useEffect } from 'react'
import { Box, Button, Flex } from 'rebass'

import { ParsedResult, Results } from './types'
import { deserialize, search } from './youtube'
import YoutubeResult from './YoutubeResult'

type Props = {
  query: string
}
const YoutubeSearch: React.FC<Props> = ({ query }) => {
  const [results, setResults] = useState<ParsedResult[]>([])

  useEffect(() => {
    if (query.length === 0) {
      setResults([])
    }
  }, [query])

  if (!query) {
    return <div />
  }

  const executeSearch = (): void => {
    search(query).then(response => {
      response.json().then((body: Results) => {
        setResults(deserialize(body))
      })
    })
  }

  const resultElements = results.map(result => (
    <Box
      as="li"
      key={result.id}
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
      <YoutubeResult result={result} />
    </Box>
  ))

  return (
    <Box>
      <Flex
        sx={{
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Button
          onClick={executeSearch}
          disabled={query.length === 0}
          sx={{
            ':disabled': {
              pointerEvents: 'none',
            },
          }}
        >
          Search Youtube
        </Button>
      </Flex>

      <Box
        as="ul"
        sx={{
          m: 0,
          p: 0,
        }}
      >
        {resultElements}
      </Box>
    </Box>
  )
}

export default YoutubeSearch
