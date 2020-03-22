import React from 'react'
import { Flex } from 'rebass'

const Tags: React.FC = () => {
  return (
    <Flex
      as="aside"
      sx={{
        borderLeft: '1px solid',
        borderColor: 'accent',
        color: 'text',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'space-between',
        overflow: 'scroll',
        p: 4,
        width: ['100%', '30%'],
      }}
    >
      tags
    </Flex>
  )
}

export default Tags
