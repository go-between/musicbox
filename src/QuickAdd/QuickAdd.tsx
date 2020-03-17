import React from 'react'
import { Box } from 'rebass'

import Search from './Search'
import ResultsContextProvider from './ResultsContextProvider'
import Results from './Results'

const FloatingResults: React.FC = ({ children }) => {
  return (
    <Box
      sx={{
        bg: 'accent',
        borderRadius: 4,
        position: 'absolute',
        top: '105%',
        left: 0,
        right: 0,
        maxHeight: '400px',
        overflow: 'scroll',
        px: 3,
        transition: 'all 2s ease-in',
      }}
    >
      {children}
    </Box>
  )
}

export const QuickAdd: React.FC = () => {
  return (
    <Box sx={{ position: 'relative' }}>
      <ResultsContextProvider>
        <Search />
        <FloatingResults>
          <Results />
        </FloatingResults>
      </ResultsContextProvider>
    </Box>
  )
}

export default QuickAdd
