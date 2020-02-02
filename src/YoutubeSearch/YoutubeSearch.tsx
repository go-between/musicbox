import React, { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { Box, Flex } from 'rebass'
import { Input } from '@rebass/forms'
import { Search } from 'react-feather'

import { ParsedResult, Results } from './types'
import { deserialize, search } from './search'
import Result from './Result'

const YoutubeSearch: React.FC = () => {
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 500)
  const [results, setResults] = useState<ParsedResult[]>([])

  useEffect(() => {
    // There's some thinking about using async/await or
    // generators in effect hooks, but it still seems
    // fairly shaky.  We're not doing too much here so we'll
    // settle on good old fashioned promises for now.
    if (debouncedQuery.length < 3) {
      return
    }

    search(debouncedQuery).then(response => {
      response.json().then((body: Results) => {
        setResults(deserialize(body))
      })
    })
  }, [debouncedQuery])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.currentTarget.value)
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
      <Result result={result} />
    </Box>
  ))

  return (
    <>
      <Flex
        sx={{
          alignItems: 'center',
          bg: 'accent',
          borderRadius: 4,
          py: 1,
          px: 2,
        }}
      >
        <Search />
        <Input
          type="text"
          value={query}
          onChange={onChange}
          sx={{
            bg: 'accent',
          }}
        />
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
    </>
  )
}

export default YoutubeSearch
