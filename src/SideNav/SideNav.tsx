import React from 'react'
import { Box } from 'rebass'

import Teams from './Teams'

import { Logo } from 'components'

export const SideNav: React.FC = ({ children }) => {
  return (
    <Box
      as="aside"
      sx={{
        bg: 'background',
        borderRight: '1px solid',
        borderColor: 'accent',
        display: ['none', 'flex'],
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        overflow: 'hidden',
        width: ['100%', '300px'],
      }}
    >
      <Box mb={4}>
        <Box px={3} py={4}>
          <Logo />
        </Box>

        <Box mb={4}>
          <Teams />
        </Box>
      </Box>

      <Box px={3} mb={3}>
        {children}
      </Box>
    </Box>
  )
}
