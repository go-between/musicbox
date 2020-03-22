import React from 'react'
import { Flex } from 'rebass'

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
      songs
    </Flex>
  )
}

export default Songs
