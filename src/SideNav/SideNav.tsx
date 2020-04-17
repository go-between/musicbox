import React from 'react'
import { Box } from 'rebass'

import Teams from './Teams'

import { Logo } from 'components'

export const SideNav: React.FC = () => {
  return (
    <Box mb={4}>
      <Box px={3} py={4}>
        <Logo />
      </Box>

      <Box mb={4}>
        <Teams />
      </Box>
    </Box>
  )
}
