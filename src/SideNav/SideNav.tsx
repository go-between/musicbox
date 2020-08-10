import React from 'react'
import { Box, Flex, Link, Text } from 'rebass'
import { useHistory } from 'react-router-dom'
import { Inbox, Search, Send, Settings } from 'react-feather'
import Gravatar from 'react-gravatar'

import { Logo } from 'components'
import LogoDarkMode from 'images/musicbox-mark-purple.svg'
import Player from 'Player'
import JumpMenu, { useJumpNavigationContext } from 'JumpMenu'
import Keyboard from 'Room/Keyboard'

import Teams from './Teams'
import { overflow } from 'styled-system'

const NavHeading: React.FC = ({ children }) => (
  <Flex
    sx={{
      px: 3,
    }}
  >
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
  <Box width="100%" mb={2} px={3}>
    <Link
      sx={{
        alignItems: 'center',
        display: 'inline-flex',
        fontSize: 2,
        mb: 3,
        textDecoration: 'none',
        width: '100%',
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
          borderBottom: '1px solid',
          borderColor: 'accent',
          justifyContent: 'space-between',
          p: 3,
          width: '100%',
        }}
      >
        <Logo imageSrc={LogoDarkMode} width='36px' />

        <Box
          onClick={show}
          sx={{
            bg:'accent',
            borderRadius: 6,
            cursor: 'pointer',
            py: 2,
            px: 3,
            mx: 3,
            flex: [1],
          }}
        >
          <Text
            sx={{
              color: 'gray500',
              fontSize: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >Search songs, change rooms, manage your library, etc</Text>
        </Box>

        <Box>
          <NavLink navigate={navigate('/user-settings')}>
            {/* Replace hardcoded email */}
            <Gravatar email='daniel.e.lavin@gmail.com' size={32} style={{ borderRadius: '100%' }} />
          </NavLink>
        </Box>
      </Flex>

      <Flex
        sx={{
          flexDirection: 'row',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Box
          as="aside"
          sx={{
            bg: 'background',
            borderRight: '1px solid',
            borderColor: 'accent',
            display: ['none', 'flex'],
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
            width: ['100%', '300px'],
          }}
        >
          <Flex justifyContent="space-between" flexDirection="column" height="100%">
            <Box>
              <Box px={3} py={4}>
                {/* <Logo imageSrc={LogoDarkMode} /> */}
              </Box>

              {/* <Flex
                onClick={show}
                width="100%"
                mb={3}
                px={3}
                color="text"
                alignItems="center"
                sx={{ cursor: 'pointer' }}
              >
                <Box as={Search} size={[16, 20]} color="muted" mr={2} />
                Open Jump Menu (j)
              </Flex> */}

              <NavHeading>Music</NavHeading>
              <NavLink navigate={navigate('/library')}>
                <Box as={Inbox} size={[16, 20]} color="muted" mr={2} />
                Library
              </NavLink>

              <NavLink navigate={navigate('/recommendations')}>
                <Box as={Send} size={[16, 20]} color="muted" mr={2} />
                Recommendations
              </NavLink>

              <Box my={4} />

              <NavHeading>Teams</NavHeading>
              <Teams />

              <Box my={4} />
              <NavHeading>Settings</NavHeading>
              <NavLink navigate={navigate('/user-settings')}>
                <Box as={Settings} size={[16, 20]} color="muted" mr={2} />
                User Settings
              </NavLink>
            </Box>
          </Flex>
        </Box>

        <Flex
          as="main"
          sx={{
            flexDirection: ['column', 'row'],
            height: '100%',
            width: ['100%'],
          }}
        >
          {children}
        </Flex>
      </Flex>

      <Box
        sx={{
          borderTop: '1px solid',
          borderColor: 'accent',
        }}
      >
        <Player />
      </Box>

      <Keyboard />
      <JumpMenu />
    </Flex>
  )
}
