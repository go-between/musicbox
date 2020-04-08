import React from 'react'
import { Box, Link } from 'rebass'
import { useHistory } from 'react-router-dom'
import { Inbox } from 'react-feather'

import Teams from './Teams'

import { Logo } from 'components'

export const SideNav: React.FC = ({ children }) => {
  const history = useHistory()
  const navigate = (to: string) => (ev: React.MouseEvent) => {
    ev.preventDefault()
    history.push(to)
  }

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
        <Link
          sx={{
            alignItems: 'center',
            display: 'inline-flex',
            fontSize: 2,
            mb: 3,
            textDecoration: 'none',
          }}
          color="text"
          onClick={navigate('/library')}
          href="#"
        >
          <Box as={Inbox} size={[16, 20]} color="muted" mr={2} />
          Library
        </Link>
        {children}
      </Box>
    </Box>
  )
}
