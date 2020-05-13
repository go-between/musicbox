import React from 'react'
import { Flex } from 'rebass'
import { Input } from '@rebass/forms'
import { Search as SearchIcon } from 'react-feather'

import { setString } from 'lib/setters'

import { useSearchContext } from '../SearchContextProvider'

const Search: React.FC = () => {
  const { query, setQuery } = useSearchContext()

  return (
    <Flex
      sx={{ borderRadius: 6 }}
      bg="accent"
      width="100%"
      px={3}
      py={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex
        sx={{
          alignItems: 'center',
          width: ['65%', '70%', '75%'],
        }}
      >
        <Flex
          sx={{
            color: 'gray500',
          }}
        >
          <SearchIcon size={22} />
        </Flex>

        <Input
          type="text"
          value={query}
          placeholder="Search library"
          onChange={setString(setQuery)}
          sx={{
            bg: 'accent',
            boxShadow: 'none',
          }}
        />
      </Flex>
    </Flex>
  )
}

export default Search
