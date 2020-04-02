import React from 'react'
import { Flex } from 'rebass'

import SideNav from 'SideNav'

import Songs from './Songs'
import SongDetails from './SongDetails'
import SearchContextProvider from './SearchContextProvider'
import TagsContextProvider from './TagsContextProvider'

const Library: React.FC = () => {
  return (
    <SearchContextProvider>
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
          <SongDetails />
        </Flex>
      </TagsContextProvider>
    </SearchContextProvider>
  )
}

export default Library
