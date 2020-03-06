import React from 'react'
import { Flex } from 'rebass'

const Header: React.FC = () => (
  <Flex
    as="header"
    sx={{
      bg: 'accent',
      py: 3,
      px: [3, 4],
    }}
  >
    Header
  </Flex>
)

export default Header
