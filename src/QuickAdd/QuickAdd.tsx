import React, { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Box, Flex } from 'rebass'
import { Input } from '@rebass/forms'
import { Search } from 'react-feather'

import { setString } from 'lib/setters'

import LibraryResults from './LibraryResults'

export const QuickAdd: React.FC = () => {
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 500)

  return (
    <Box>
      <Flex
        sx={{
          alignItems: 'center',
          bg: 'accent',
          borderRadius: 4,
          py: 1,
          px: 2,
          mb: 4,
        }}
      >
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

      <LibraryResults query={debouncedQuery} />
    </Box>
  )
}

export default QuickAdd
