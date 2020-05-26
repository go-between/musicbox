import React, { createContext, useContext, useState } from 'react'

import { Result } from './resultDeserializer'
import { Tag } from './graphql'

type ResultsContext = {
  error: string
  query: string
  results: Result[]
  resultIndex: number | null
  setError: (error: string) => void
  setQuery: (query: string) => void
  setResults: (results: Result[]) => void
  setResultIndex: (idx: number | null) => void
  tags: Tag[]
  setTags: (tags: Tag[]) => void
}

const ResultsContext = createContext<Partial<ResultsContext>>({})
const ResultsContextProvider: React.FC = ({ children }) => {
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [tags, setTags] = useState<Tag[]>([])
  const [results, setResults] = useState<Result[]>([])
  const [resultIndex, setResultIndex] = useState<number | null>(null)

  return (
    <ResultsContext.Provider
      value={{
        error,
        query,
        results,
        resultIndex,
        setError,
        setQuery,
        setResults,
        setResultIndex,
        tags,
        setTags,
      }}
    >
      {children}
    </ResultsContext.Provider>
  )
}

export const useResultsContext: () => ResultsContext = () => {
  const {
    error,
    query,
    results,
    setError,
    setQuery,
    setResults,
    resultIndex,
    setResultIndex,
    tags,
    setTags,
  } = useContext(ResultsContext)

  if (
    error === undefined ||
    query === undefined ||
    setError === undefined ||
    results === undefined ||
    setQuery === undefined ||
    setResults === undefined ||
    resultIndex === undefined ||
    setResultIndex === undefined ||
    tags === undefined ||
    setTags === undefined
  ) {
    throw new Error('ResultsContext accessed before being set')
  }

  return {
    error,
    query,
    results,
    resultIndex,
    setError,
    setQuery,
    setResults,
    setResultIndex,
    tags,
    setTags,
  }
}
export default ResultsContextProvider
