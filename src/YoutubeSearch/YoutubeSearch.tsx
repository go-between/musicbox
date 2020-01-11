import React, { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

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
    <li key={result.id}>
      <Result result={result} />
    </li>
  ))

  return (
    <>
      <input type="text" value={query} onChange={onChange} />
      <ul>{resultElements}</ul>
    </>
  )
}

export default YoutubeSearch
