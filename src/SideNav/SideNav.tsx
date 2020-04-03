import React from 'react'
import { Box, Flex, Link } from 'rebass'
import { useHistory } from 'react-router-dom'
import { Home, Inbox } from 'react-feather'

import Teams from './Teams'

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
        p: 4,
        width: ['100%', '300px'],
      }}
    >
      <Box mb={4}>
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
          {/* <Flex
            sx={{
              alignItems: 'center',
              mr: 2,
            }}
          >

          </Flex> */}
          <Box as={Inbox} size={[16, 20]} color='muted' mr={2} />
          Library
        </Link>

        <Teams />
      </Box>

      <Box>{children}</Box>
    </Box>
  )
}
