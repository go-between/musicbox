import React from 'react'
import { Box, Heading, Flex } from 'rebass'

import { useTagsContext } from '../TagsContextProvider'
import Search from './Search'
import Results from './Results'

const TagMessage: React.FC = () => {
  const { activeTag } = useTagsContext()

  const tagMessage = !!activeTag ? `Tagging with ${activeTag.name}.` : 'No tag selected.'
  return (
    <>
      <Box>Tags make it easier to organize and enqueue songs in a room.</Box>
      <Box>Your tags are organized on the right. {tagMessage}</Box>
    </>
  )
}

const Songs: React.FC = () => {
  return (
    <Flex
      as="main"
      sx={{
        flexDirection: 'column',
        height: '100vh',
        p: 4,
        width: ['100%', '70%'],
      }}
    >
      <Heading mb={4}>My Library</Heading>
      <Search />
      <TagMessage />
      <Box sx={{ maxHeight: '100vh', overflow: 'scroll' }}>
        <Results />
      </Box>
    </Flex>
  )
}

export default Songs
