import React from 'react'
import { Heading, Flex } from 'rebass'

const Rooms: React.FC = () => {
  return (
    <Flex
      sx={{
        alignItems: 'top',
        bg: 'background',
        flexDirection: ['column', 'row'],
        height: '100%',
        mx: 'auto',
        position: 'relative',
      }}
    >
      <Flex as="main" alignItems="center" justifyContent="center" width="100%">
        <Heading>Please select a room on the left</Heading>
      </Flex>
    </Flex>
  )
}

export default Rooms
