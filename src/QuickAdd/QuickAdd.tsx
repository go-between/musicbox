import React from 'react'
import { Box } from 'rebass'

import Search from './Search'
import ResultsContextProvider from './ResultsContextProvider'
import Results from './Results'

export const QuickAdd: React.FC = () => {
  return (
    <Box sx={{ position: 'relative' }}>
      <ResultsContextProvider>
        <Search />
        <Results />
      </ResultsContextProvider>
    </Box>
  )
}

export default QuickAdd
