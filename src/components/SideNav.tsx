import React from 'react'
import { Box, Link } from 'rebass'
import { useHistory } from 'react-router-dom'
import { Home, Inbox } from 'react-feather'

export const SideNav: React.FC = () => {
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
            display: 'flex',
            fontSize: 2,
            mb: 3,
            textDecoration: 'none',
          }}
          color="text"
          onClick={navigate('/home')}
          href="#"
        >
          <Home size={20} color="#4A5568" />
          <Box mr={2} />
          Home
        </Link>

        <Link
          sx={{
            alignItems: 'center',
            display: 'flex',
            fontSize: 2,
            mb: 3,
            textDecoration: 'none',
          }}
          color="text"
          onClick={navigate('/library')}
          href="#"
        >
          <Inbox size={20} color="#4A5568" />
          <Box mr={2} />
          Library
        </Link>
      </Box>
    </Box>
  )
}
