import React, { createContext, useContext, useState } from 'react'

type SearchContext = {
  activeSongId: string
  query: string
  setActiveSongId: (songId: string) => void
  setQuery: (query: string) => void
}

const SearchContext = createContext<Partial<SearchContext>>({})
const SearchProvider: React.FC = ({ children }) => {
  const [query, setQuery] = useState('')
  const [activeSongId, setActiveSongId] = useState('')

  return (
    <SearchContext.Provider value={{ activeSongId, query, setActiveSongId, setQuery }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearchContext: () => SearchContext = () => {
  const { activeSongId, query, setActiveSongId, setQuery } = useContext(SearchContext)

  if (activeSongId === undefined || query === undefined || setActiveSongId === undefined || setQuery === undefined) {
    throw new Error('Search accessed before being set')
  }

  return { activeSongId, query, setActiveSongId, setQuery }
}
export default SearchProvider
