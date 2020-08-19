import React from 'react'
import { Box, Flex, Link, Text } from 'rebass'
import { useHistory } from 'react-router-dom'
import { Inbox, Send } from 'react-feather'

import { AppHeader } from 'components'
import Player from 'Player'
import JumpMenu from 'JumpMenu'
import Keyboard from 'Room/Keyboard'

import Teams from './Teams'

const NavHeading: React.FC = ({ children }) => (
  <Flex>
    <Text
      sx={{
        color: 'gray500',
        fontSize: 1,
        fontWeight: '600',
        mb: 3,
        textTransform: 'uppercase',
      }}
    >
      {children}
    </Text>
  </Flex>
)

const NavLink: React.FC<{ navigate: (ev: React.MouseEvent) => void }> = ({ children, navigate }) => (
  <Box width="100%" mb={2}>
    <Link
      sx={{
        alignItems: 'center',
        display: 'inline-flex',
        fontSize: 2,
        px: 2,
        py: 1,
        textDecoration: 'none',
        width: '100%',
        '&:hover': {
          bg: 'primaryHover',
          borderRadius: 6,
        },
      }}
      color="text"
      onClick={navigate}
      href="#"
    >
      {children}
    </Link>
  </Box>
)

export const SideNav: React.FC = ({ children }) => {
  const history = useHistory()
  const navigate = (to: string) => (ev: React.MouseEvent) => {
    ev.preventDefault()
    history.push(to)
  }

  return (
    <Flex
      sx={{
        alignItems: 'top',
        bg: 'background',
        flexDirection: 'column',
        height: '100vh',
        mx: 'auto',
        position: 'relative',
        maxWidth: '1440px',
      }}
    >
      <AppHeader />

      <Flex
        sx={{
          flexDirection: ['column', 'row'],
          height: '100%',
          overflow: 'hidden',
          py: 4,
          px: 3,
        }}
      >
        <Box
          as="nav"
          sx={{
            display: ['none', 'flex'],
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
            width: ['100%', '300px'],
          }}
        >
          <Flex justifyContent="space-between" flexDirection="column" height="100%">
            <Box>
              <Box pb={4}>
                <NavHeading>Music</NavHeading>
                <NavLink navigate={navigate('/library')}>
                  <Box as={Inbox} size={[16, 20]} color="muted" mr={2} />
                  Library
                </NavLink>

                <NavLink navigate={navigate('/recommendations')}>
                  <Box as={Send} size={[16, 20]} color="muted" mr={2} />
                  Recommendations
                </NavLink>
              </Box>

              <Box pb={4}>
                <NavHeading>Teams</NavHeading>
                <Teams />
              </Box>
            </Box>
          </Flex>
        </Box>

        <Flex
          as="main"
          sx={{
            flexDirection: ['column', 'column', 'column', 'row'],
            pl: [0, 4, 4, 4],
            pr: 0,
            height: '100%',
            width: ['100%'],
          }}
        >
          {children}
        </Flex>
      </Flex>

      <Player />
      <Keyboard />
      <JumpMenu />
    </Flex>
  )
}
