import React, { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Box, Flex } from 'rebass'
import { Input, Select } from '@rebass/forms'
import { Search } from 'react-feather'

import { setString } from 'lib/setters'

import LibraryResults from './LibraryResults'
import YoutubeSearch from './YoutubeSearch'

const Results: React.FC<{ query: string; selection: string }> = ({ query, selection }) => {
  if (query.length === 0) {
    return <div />
  }

  switch (selection) {
    case 'youtube':
      return <YoutubeSearch query={query} />
    default:
      return <LibraryResults query={query} />
  }
}

export const QuickAdd: React.FC = () => {
  const [query, setQuery] = useState('')
  const [searchSelection, setSearchSelection] = useState('library')
  const [debouncedQuery] = useDebounce(query, 500)

  return (
    <Box sx={{ position: 'relative' }}>
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 4,
          mb: 4,
        }}
      >
        <Flex sx={{ borderRadius: 4 }} bg="accent" width="100%" mr={2} py={1} px={2} alignItems="center">
          <Search />
          <Input
            type="text"
            value={query}
            onChange={setString(setQuery)}
            sx={{
              bg: 'accent',
              boxShadow: 'none',
            }}
          />
        </Flex>
        <Select
          defaultValue="library"
          width="200px"
          sx={{ borderRadius: 4, py: 2 }}
          onChange={setString(setSearchSelection)}
        >
          <option value="library">My Library</option>
          <option value="youtube">Youtube</option>
        </Select>
      </Flex>
      <Box sx={{ position: 'absolute', left: 0, right: 0, bg: 'background' }}>
        <Results query={debouncedQuery} selection={searchSelection} />
      </Box>
    </Box>
  )
}

export default QuickAdd
