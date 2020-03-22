import React from 'react'
import { Flex } from 'rebass'

import { SideNav } from 'components'

import Songs from './Songs'
import Tags from './Tags'

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
      <Songs />
      <Tags />
    </Flex>
  )
}

export default Library
