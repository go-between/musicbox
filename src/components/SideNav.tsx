import React from 'react'
import { Box, Flex, Heading, Link } from 'rebass'
import { useHistory } from 'react-router-dom'
import { Home, Inbox, Send, UserPlus } from 'react-feather'

export const SideNav: React.FC = () => {
  const history = useHistory()
  const navigate = (to: string) => (ev: React.MouseEvent) => {
    ev.preventDefault()
    history.push(to)
  }

  return (
    <Flex
      as="aside"
      sx={{
        bg: 'background',
        borderRight: '1px solid',
        borderColor: 'muted',
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
          onClick={() => alert('lol')}
          href="#"
        >
          <Inbox size={20} color="#4A5568" />
          <Box mr={2} />
          Library
        </Link>
      </Box>

      <Box>
        <Heading
          sx={{
            fontSize: '.75rem',
            fontWeight: '800',
            letterSpacing: '.025rem',
            mb: 3,
            textTransform: 'uppercase',
          }}
          color="Text"
        >
          Settings
        </Heading>

        <Link
          sx={{
            alignItems: 'center',
            display: 'flex',
            fontSize: 2,
            mb: 3,
            textDecoration: 'none',
          }}
          color="text"
          onClick={navigate('/invitations')}
          href="#"
        >
          <Send size={20} color="#4A5568" />
          <Box mr={2} />
          Invitations
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
          onClick={navigate('/signup')}
          href="#"
        >
          <UserPlus size={20} color="#4A5568" />
          <Box mr={2} />
          Sign Up
        </Link>
      </Box>
    </Flex>
  )
}
