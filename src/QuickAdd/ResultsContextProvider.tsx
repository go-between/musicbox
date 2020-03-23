import React, { createContext, useContext, useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import { useMutation } from '@apollo/react-hooks'

import { usePlaylistRecordContext } from 'Room'

import { Result } from './types'
import { SongCreateMutation, SONG_CREATE } from './graphql'

type ResultsContext = {
  error: string
  query: string
  results: Result[]
  resultIndex: number | null
  setError: (error: string) => void
  setQuery: (query: string) => void
  setResults: (results: Result[]) => void
  selectResult: (result: Result) => void
  setResultIndex: (idx: number | null) => void
}

const ResultsContext = createContext<Partial<ResultsContext>>({})
const ResultsContextProvider: React.FC = ({ children }) => {
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [resultIndex, setResultIndex] = useState<number | null>(null)
  const { addRecord } = usePlaylistRecordContext()
  const { addToast } = useToasts()
  const [createSong] = useMutation<SongCreateMutation['data'], SongCreateMutation['vars']>(SONG_CREATE, {
    onCompleted: data => addRecord(data.songCreate.song.id),
  })

  const selectResult = (record: Result): void => {
    if (record.resultType === 'library') {
      addRecord(record.id)
    } else {
      createSong({ variables: { youtubeId: record.id } })
    }

    addToast(`Successfully added ${record.name}`, { appearance: 'success', autoDismiss: true })
  }

  return (
    <ResultsContext.Provider
      value={{ error, query, results, resultIndex, setError, setQuery, setResults, selectResult, setResultIndex }}
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
    selectResult,
    resultIndex,
    setResultIndex,
  } = useContext(ResultsContext)

  if (
    error === undefined ||
    query === undefined ||
    setError === undefined ||
    results === undefined ||
    setQuery === undefined ||
    setResults === undefined ||
    selectResult === undefined ||
    resultIndex === undefined ||
    setResultIndex === undefined
  ) {
    throw new Error('ResultsContext accessed before being set')
  }

  return { error, query, results, resultIndex, setError, setQuery, setResults, selectResult, setResultIndex }
}
export default ResultsContextProvider
