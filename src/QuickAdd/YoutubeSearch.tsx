import React, { useState, useEffect } from 'react'
import { Box } from 'rebass'

import { ParsedResult, Results } from './types'
import { deserialize, search } from './youtube'
import YoutubeResult from './YoutubeResult'

type Props = {
  query: string
}
const YoutubeSearch: React.FC<Props> = ({ query }) => {
  const [results, setResults] = useState<ParsedResult[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (query.length === 0) {
      setResults([])
    }

    search(query).then(response => {
      if (response.status !== 200) {
        setError('Sorry, YouTube search is temporarily unavailable.  Try adding some songs from your library!')
        return
      }
      response.json().then((body: Results) => {
        setResults(deserialize(body))
      })
    })
  }, [query])

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

  const errorDisplay = (
    <Box
      key="youtube-result-error"
      as="li"
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
      {error}
    </Box>
  )
  const result = !!error ? errorDisplay : resultElements
  return (
    <Box
      as="ul"
      sx={{
        m: 0,
        p: 0,
      }}
    >
      {result}
    </Box>
  )
}

export default YoutubeSearch
