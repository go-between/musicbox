import React, { useState } from 'react'
import { Box, Heading, Link } from 'rebass'

import Search from './Search'
import ResultsContextProvider from './ResultsContextProvider'
import Results from './Results'
import YoutubeAdd from './YoutubeAdd'

const SearchInterface: React.FC<{ source: 'search' | 'youtube' }> = ({ source }) => {
  if (source === 'search') {
    return (
      <ResultsContextProvider>
        <Search />
        <Results />
      </ResultsContextProvider>
    )
  }

  return <YoutubeAdd />
}

type SourceSelectionProps = {
  source: 'search' | 'youtube'
  setSource: (source: 'search' | 'youtube') => void
}
const SourceSelection: React.FC<SourceSelectionProps> = ({ source, setSource }) => {
  const setSearch = (ev: React.MouseEvent): void => {
    ev.preventDefault()
    setSource('search')
  }
  const setYoutube = (ev: React.MouseEvent): void => {
    ev.preventDefault()
    setSource('youtube')
  }

  if (source === 'youtube') {
    return (
      <Link href="#" onClick={setSearch} sx={{ color: 'text' }}>
        Use Search instead
      </Link>
    )
  }

  return (
    <Link href="#" onClick={setYoutube} sx={{ color: 'text' }}>
      Use YouTube ID instead
    </Link>
  )
}

export const QuickAdd: React.FC = () => {
  const [source, setSource] = useState<'search' | 'youtube'>('search')

  return (
    <Box sx={{ position: 'relative' }}>
      <Heading fontSize={2} mb={2}>
        <SourceSelection source={source} setSource={setSource} />
      </Heading>
      <SearchInterface source={source} />
    </Box>
  )
}

export default QuickAdd
