import React, { createContext, useContext, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { usePlaylistRecordContext } from 'Room'

import { Result } from './types'
import { SongCreateMutation, SONG_CREATE } from './graphql'

type ResultsContext = {
  results: Result[]
  setResults: (results: Result[]) => void
  selectResult: (result: Result) => void
}

const ResultsContext = createContext<Partial<ResultsContext>>({})
const ResultsContextProvider: React.FC = ({ children }) => {
  const [results, setResults] = useState<Result[]>([])
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

  return <ResultsContext.Provider value={{ results, setResults, selectResult }}>{children}</ResultsContext.Provider>
}

export const useResultsContext: () => ResultsContext = () => {
  const { results, setResults, selectResult } = useContext(ResultsContext)

  if (results === undefined || setResults === undefined || selectResult === undefined) {
    throw new Error('ResultsContext accessed before being set')
  }

  return { results, setResults, selectResult }
}
export default ResultsContextProvider
