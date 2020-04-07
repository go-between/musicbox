import React from 'react'
import { Heading, Flex } from 'rebass'

import SideNav from 'SideNav'

const Rooms: React.FC = () => {
  return (
    <Flex
      sx={{
        alignItems: 'top',
        bg: 'background',
        flexDirection: ['column', 'row'],
        minHeight: '100vh',
        mx: 'auto',
        position: 'relative',
      }}
    >
      <SideNav />
      <Flex as="main" alignItems="center" justifyContent="center" width="100%">
        <Heading>Please select a room on the left</Heading>
      </Flex>
    </Flex>
  )
}

export default Rooms
