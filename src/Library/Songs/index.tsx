import React from 'react'
import { Flex } from 'rebass'

import Search from './Search'
import Tags from './Tags'
import Results from './Results'

const Songs: React.FC = () => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        p: 4,
        height: '100%',
        width: '100%',
      }}
    >
      <Search />
      <Tags />
      <Results />
    </Flex>
  )
}

export default Songs
