import React from 'react'
import { Box, Flex, Link, Text } from 'rebass'
import { useHistory } from 'react-router-dom'
import { Inbox, Grid, Search, Send, Settings } from 'react-feather'
import Gravatar from 'react-gravatar'

import { Logo } from 'components'
import LogoDarkMode from 'images/musicbox-mark-purple.svg'
import Player from 'Player'
import JumpMenu, { useJumpNavigationContext } from 'JumpMenu'
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
          bg: 'accent',
          borderRadius: 6,
        }
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
  const { show } = useJumpNavigationContext()
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
      <Flex
        as="header"
        sx={{
          alignItems: 'center',
          bg: 'backgroundTint',
          justifyContent: 'space-between',
          p: [3],
          width: '100%',
        }}
      >
        <Logo imageSrc={LogoDarkMode} width='42px' />

        <Flex
          onClick={show}
          sx={{
            alignItems: 'center',
            bg:'accent',
            borderRadius: 6,
            color: 'gray500',
            cursor: 'pointer',
            py: 2,
            px: 3,
            mx: 3,
            flex: [1],
            maxWidth: ['100%', '50%']
          }}
        >
          <Box as={Search} size={18} />
          <Text
            sx={{
              fontSize: 2,
              mx: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >Search for Music</Text>
        </Flex>

        <Flex as={Link} onClick={navigate('user-settings')}>
          <Gravatar email='daniel.e.lavin@gmail.com' size={36} style={{ borderRadius: '100%' }} />
        </Flex>
      </Flex>

      <Flex
        sx={{
          flexDirection: 'row',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Box
          as="nav"
          sx={{
            bg: 'background',
            display: ['none', 'flex'],
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
            width: ['100%', '300px'],
          }}
        >
          <Flex justifyContent="space-between" flexDirection="column" height="100%">
            <Box py={4} px={[3]}>
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
            flexDirection: ['column', 'column', 'row'],
            height: '100%',
            width: ['100%'],
          }}
        >
          {children}
        </Flex>
      </Flex>

      <Box
        sx={{}}
      >
        <Player />
      </Box>

      <Keyboard />
      <JumpMenu />
    </Flex>
  )
}
