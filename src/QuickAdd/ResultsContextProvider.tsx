import React, { createContext, useContext, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { usePlaylistRecordContext } from 'Room'

import { Result } from './types'
import { SongCreateMutation, SONG_CREATE } from './graphql'

type ResultsContext = {
  error: string
  setError: (error: string) => void
  results: Result[]
  setResults: (results: Result[]) => void
  selectResult: (result: Result) => void
  resultIndex: number | null
  setResultIndex: (idx: number | null) => void
}

const ResultsContext = createContext<Partial<ResultsContext>>({})
const ResultsContextProvider: React.FC = ({ children }) => {
  const [error, setError] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [resultIndex, setResultIndex] = useState<number | null>(null)
  const { addRecord } = usePlaylistRecordContext()
  const [createSong] = useMutation<SongCreateMutation['data'], SongCreateMutation['vars']>(SONG_CREATE, {
    onCompleted: data => addRecord(data.songCreate.song.id),
  })

  const selectResult = (record: Result): void => {
    if (record.resultType === 'library') {
      addRecord(record.id)
    } else {
      createSong({ variables: { youtubeId: record.id } })
    }
  }

  return (
    <ResultsContext.Provider
      value={{ error, setError, results, setResults, selectResult, resultIndex, setResultIndex }}
    >
      {children}
    </ResultsContext.Provider>
  )
}

export const useResultsContext: () => ResultsContext = () => {
  const { error, setError, results, setResults, selectResult, resultIndex, setResultIndex } = useContext(ResultsContext)

  if (
    error === undefined ||
    setError === undefined ||
    results === undefined ||
    setResults === undefined ||
    selectResult === undefined ||
    resultIndex === undefined ||
    setResultIndex === undefined
  ) {
    throw new Error('ResultsContext accessed before being set')
  }

  return { error, setError, results, setResults, selectResult, resultIndex, setResultIndex }
}
export default ResultsContextProvider
