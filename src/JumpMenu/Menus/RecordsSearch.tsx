import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Heading } from 'rebass'

import { useInputContext } from '../InputContextProvider'
import { SearchQuery, SEARCH_QUERY } from '../graphql'
import Results, { deserialize, Result as ResultType } from '../Results'

const RecordsSearch: React.FC = () => {
  const [results, setResults] = useState<ResultType[]>([])
  const { input } = useInputContext()
  const { loading } = useQuery<SearchQuery['data'], SearchQuery['vars']>(SEARCH_QUERY, {
    fetchPolicy: 'network-only',
    variables: { query: input },
    onCompleted: data => setResults(data.search.map(deserialize)),
  })

  if (loading) {
    return <p>Loading</p>
  }

  return (
    <>
      <Heading>{!!input ? `Searching for ${input}` : 'Showing alll songs'}</Heading>
      <Results results={results} />
    </>
  )
}

export default RecordsSearch
