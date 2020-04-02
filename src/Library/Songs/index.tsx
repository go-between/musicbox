import React from 'react'
import { Box, Flex } from 'rebass'

import Search from './Search'
import Tags from './Tags'
import Results from './Results'

const Songs: React.FC = () => {
  return (
    <Flex
      as="main"
      sx={{
        flexDirection: 'column',
        height: '100vh',
        p: 4,
        width: ['100%', '70%'],
      }}
    >
      <Search />
      <Tags />
      <Box sx={{ maxHeight: '100vh', overflow: 'scroll' }}>
        <Results />
      </Box>
    </Flex>
  )
}

export default Songs
