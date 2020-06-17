import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Heading } from 'rebass'

import { useInputContext } from 'JumpMenu/InputContextProvider'
import { LibraryRecordsQuery, LIBRARY_RECORDS_QUERY } from './graphql'
import Results from './Results'

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

  let heading = ''
  if (!input && !selectedTag) {
    heading = 'Showing all songs'
  } else if (!!input) {
    heading = `Searching for ${input}`
  } else if (!!selectedTag) {
    heading = `Showing songs tagged with ${selectedTag.name}`
  }

  return (
    <>
      <Heading>{heading}</Heading>
      <Results results={data.libraryRecords} />
    </>
  )
}

export default FindInLibrary
