import React from 'react'
import { Flex } from 'rebass'

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
            height: '100%',
            width: '100%',
            mx: 'auto',
            position: 'relative',
            overflowY: 'scroll',
          }}
        >
          <Songs />
          <SongDetails />
        </Flex>
      </TagsContextProvider>
    </SearchContextProvider>
  )
}

export default Library
