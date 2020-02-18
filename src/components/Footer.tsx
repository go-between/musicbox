import React from 'react'
import { Box, Flex } from 'rebass'

const Footer: React.FC = () => (
  <Flex
    as="footer"
    sx={{
      bg: 'accent'
    }}
  >
    <Box>
      No Song Playing /
      Song details
    </Box>

    <Box>
      Controls /
      play /
      thumbs up or down
    </Box>

    <Box>
      Volume /
      Mute
    </Box>
  </Flex>
)

export default Footer
