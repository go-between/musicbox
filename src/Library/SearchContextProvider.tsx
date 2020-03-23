import React, { createContext, useContext, useState } from 'react'

type SearchContext = {
  query: string
  setQuery: (query: string) => void
}

const SearchContext = createContext<Partial<SearchContext>>({})
const SearchProvider: React.FC = ({ children }) => {
  const [query, setQuery] = useState('')

  return <SearchContext.Provider value={{ query, setQuery }}>{children}</SearchContext.Provider>
}

export const useSearchContext: () => SearchContext = () => {
  const { query, setQuery } = useContext(SearchContext)

  if (query === undefined || setQuery === undefined) {
    throw new Error('Search accessed before being set')
  }

  return { query, setQuery }
}
export default SearchProvider
