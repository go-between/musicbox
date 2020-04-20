import React from 'react'
import { Box, Flex } from 'rebass'
import { useRouteMatch } from 'react-router-dom'

import { Logo } from 'components'
import Keyboard from 'Room/Keyboard'

import Teams from './Teams'

export const SideNav: React.FC = () => {
  const inRoom = useRouteMatch('/room/:id')

  const roomKeyboardShortcuts = inRoom && <Box px={3}>{!!inRoom && <Keyboard />}</Box>

  return (
    <Flex justifyContent="space-between" flexDirection="column" height="100%">
      <Box>
        <Box px={3} py={4}>
          <Logo />
        </Box>

        <Box mb={4}>
          <Teams />
        </Box>
      </Box>

      {roomKeyboardShortcuts}
    </Flex>
  )
}
