import React from 'react'
import { Flex } from 'rebass'

import { SideNav } from 'components'

import Songs from './Songs'
import Tags from './Tags'
import TagsContextProvider from './TagsContextProvider'

const Library: React.FC = () => {
  return (
    <TagsContextProvider>
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
    </TagsContextProvider>
  )
}

export default Library
