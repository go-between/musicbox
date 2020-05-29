import React from 'react'
import { Box, Heading, Text } from 'rebass'

const KeyboardShortcuts: React.FC = () => {
  return (
    <>
      <Heading>Keyboard Shortcuts</Heading>
      <Box>
        <Box mb={3}>
          <Text>Jump Menu Controls</Text>
          <Box as="ul">
            <Box as="li">
              Open jump menu: <b>j</b>
            </Box>

            <Box as="li">
              Open keyboard shortcuts help: <b>k</b>
            </Box>

            <Box as="li">
              Navigate back within jump menu: <b>Left Arrow</b>
            </Box>

            <Box as="li">
              Navigate forward within jump menu: <b>Right Arrow</b> or <b>Enter</b>
            </Box>

            <Box as="li">
              Navigate up within jump menu: <b>Up Arrow</b>
            </Box>

            <Box as="li">
              Navigate down within jump menu: <b>Down Arrow</b>
            </Box>
          </Box>
        </Box>

        <Box mb={3}>
          <Text>Room Specific Shortcuts</Text>
          <Box as="ul">
            <Box as="li">
              Add current song to library: <b>a</b>
            </Box>

            <Box as="li">
              Upvote current song: <b>u</b>
            </Box>
          </Box>
        </Box>

        <Box mb={3}>
          <Text>Jump Menu Search Results</Text>
          <Box as="ul">
            <Box as="li">
              Select search result(s): <b>s</b>
            </Box>

            <Box as="li">
              Toggle selection of all results:{' '}
              <Text sx={{ display: 'inline', textDecoration: 'underline' }}>
                <b>S</b>
              </Text>
            </Box>

            <Box as="li">
              Queue selected song(s): <b>q</b>
            </Box>

            <Box as="li">
              Shuffle and queue selected song(s):{' '}
              <Text sx={{ display: 'inline', textDecoration: 'underline' }}>
                <b>Q</b>
              </Text>
            </Box>

            <Box as="li">
              Preview a selected song: <b>p</b>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default KeyboardShortcuts
