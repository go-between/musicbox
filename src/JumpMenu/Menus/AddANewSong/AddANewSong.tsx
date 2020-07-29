import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Heading } from 'rebass'

import { useInputContext } from 'JumpMenu/InputContextProvider'
import { SearchQuery, SEARCH_QUERY } from './graphql'
import Results from './Results'
import { deserialize } from './deserialize'

const AddANewSong: React.FC = () => {
  const { input } = useInputContext()

  const { data, loading } = useQuery<SearchQuery['data'], SearchQuery['vars']>(SEARCH_QUERY, {
    fetchPolicy: 'network-only',
    variables: { query: input },
    skip: !input,
  })

  if (loading || !data) {
    return <p>Loading</p>
  }

  const results = data.search.map(deserialize)
  return (
    <>
      <Heading>Searching for {input}</Heading>
      <Results results={results} />
    </>
  )
}

export default AddANewSong
