import React from 'react'
import { Box, Text } from 'rebass'

const KeyboardShortcuts: React.FC = () => {
  return (
    <Box>
      <Box mb={3}>
        <Text>Jump Menu Controls</Text>
        <Box as="ul">
          <Box as="li">
            Open jump menu: <b>J</b>
          </Box>

          <Box as="li">
            Navigate back within jump menu: <b>Left Arrow</b>
          </Box>

          <Box as="li">
            Navigate up within jump menu: <b>Up Arrow</b>
          </Box>

          <Box as="li">
            Navigate down within jump menu: <b>Down Arrow</b>
          </Box>

          <Box as="li">
            Select item within jump menu: <b>Enter</b>
          </Box>
        </Box>
      </Box>

      <Box mb={3}>
        <Text>Room Specific Shortcuts</Text>
        <Box as="ul">
          <Box as="li">
            Add current song to library: <b>A</b>
          </Box>

          <Box as="li">
            Upvote current song: <b>U</b>
          </Box>
        </Box>
      </Box>

      <Box mb={3}>
        <Text>Jump Menu Search Results</Text>
        <Box as="ul">
          <Box as="li">
            Select search result(s): <b>S</b>
          </Box>

          <Box as="li">
            Queue selected song(s): <b>Q</b>
          </Box>

          <Box as="li">
            Preview a selected song: <b>P</b>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default KeyboardShortcuts
