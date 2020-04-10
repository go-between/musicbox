import React from 'react'
import { Flex } from 'rebass'

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
      <Results />
    </Flex>
  )
}

export default Songs
