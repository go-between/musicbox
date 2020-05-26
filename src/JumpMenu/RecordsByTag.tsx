import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { useInputContext } from './InputContextProvider'
import { LibraryRecordsQuery, LIBRARY_RECORDS_QUERY } from './graphql'
import Results, { deserialize, Result as ResultType } from './Results'

const RecordsByTag: React.FC = () => {
  const [results, setResults] = useState<ResultType[]>([])
  const { selectedTag } = useInputContext()
  const tagIds = []
  if (selectedTag) {
    tagIds.push(selectedTag.id)
  }
  const { loading } = useQuery<LibraryRecordsQuery['data'], LibraryRecordsQuery['vars']>(LIBRARY_RECORDS_QUERY, {
    fetchPolicy: 'network-only',
    variables: { tagIds },
    onCompleted: data => setResults(data.libraryRecords.map(deserialize)),
    skip: selectedTag === null,
  })

  if (loading) {
    return <p>Loading</p>
  }

  return <Results results={results} />
}

export default RecordsByTag
