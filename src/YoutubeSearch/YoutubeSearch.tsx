import React, { useState, useEffect } from 'react'

import { ParsedResult, Results } from './types'
import { deserialize, search } from './search'

const YoutubeSearch: React.FC = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ParsedResult[]>([])

  useEffect(() => {
    // There's some thinking about using async/await or
    // generators in effect hooks, but it still seems
    // fairly shaky.  We're not doing too much here so we'll
    // settle on good old fashioned promises for now.
    if (query.length < 3) {
      return
    }

    search(query).then(response => {
      response.json().then((body: Results) => {
        setResults(deserialize(body))
      })
    })
  }, [query])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.currentTarget.value)
  }

  const resultElements = results.map(result => <li key={result.id}>{result.description}</li>)

  return (
    <>
      <input type="text" value={query} onChange={onChange} />
      <ul>{resultElements}</ul>
    </>
  )
}

export default YoutubeSearch
