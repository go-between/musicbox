import React from 'react'
import { Flex } from 'rebass'

const SongDetails: React.FC = () => {
  return (
    <Flex
      as="aside"
      sx={{
        borderLeft: '1px solid',
        borderColor: 'accent',
        color: 'text',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'scroll',
        p: 4,
        width: ['100%', '30%'],
      }}
    >
      Song Details
    </Flex>
  )
}

export default SongDetails
