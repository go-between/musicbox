import React from 'react'
import { Flex } from 'rebass'

import { SideNav } from 'components'

const Library: React.FC = () => {
  return (
    <Flex
      sx={{
        alignItems: 'top',
        bg: 'background',
        flexDirection: ['column', 'row'],
        minHeight: '100vh',
        mx: 'auto',
        position: 'relative',
      }}
    >
      <SideNav />
    </Flex>
  )
}

export default Library
