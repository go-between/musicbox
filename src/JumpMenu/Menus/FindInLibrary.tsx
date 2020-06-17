import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Heading } from 'rebass'

import { useInputContext } from '../InputContextProvider'
import { LibraryRecordsQuery, LIBRARY_RECORDS_QUERY } from '../graphql'
import Results, { deserialize } from '../Results'

const FindInLibrary: React.FC = () => {
  const { input, selectedTag } = useInputContext()
  const variables: { query: string; tagIds?: string[] } = {
    query: input,
  }
  if (!!selectedTag) {
    variables['tagIds'] = [selectedTag.id]
  }

  const { data, loading } = useQuery<LibraryRecordsQuery['data'], LibraryRecordsQuery['vars']>(LIBRARY_RECORDS_QUERY, {
    fetchPolicy: 'network-only',
    variables,
    skip: Object.keys(variables).length === 0,
  })

  if (loading || !data) {
    return <p>Loading</p>
  }

  const results = data.libraryRecords.map(deserialize)
  return (
    <>
      <Heading>{!!input ? `Searching for ${input}` : 'Showing all songs'}</Heading>
      <Results results={results} />
    </>
  )
}

export default FindInLibrary
