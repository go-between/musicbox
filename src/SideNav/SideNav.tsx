import React from 'react'
import { Box, Flex, Link, Text } from 'rebass'
import { useHistory } from 'react-router-dom'
import { Inbox, Search, Send, Settings } from 'react-feather'

import { Logo } from 'components'
import Keyboard from 'Room/Keyboard'
import { useJumpNavigationContext } from 'JumpMenu'

import Teams from './Teams'

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
        color: 'text',
        display: 'inline-flex',
        fontSize: 2,
        mb: 3,
        textDecoration: 'none',
        width: '100%',
      }}
      onClick={navigate}
      href="#"
    >
      {children}
    </Link>
  </Box>
)

export const SideNav: React.FC = () => {
  const { show } = useJumpNavigationContext()
  const history = useHistory()
  const navigate = (to: string) => (ev: React.MouseEvent) => {
    ev.preventDefault()
    history.push(to)
  }

  return (
    <Flex justifyContent="space-between" flexDirection="column" height="100%">
      <Box>
        <Box px={3} py={4}>
          <Logo />
        </Box>

        {/* <NavHeading>Music</NavHeading> */}
        <Box width="100%" mb={2} px={3}>
          <Box
            onClick={show}
            sx={{
              alignItems: 'center',
              color: 'text',
              cursor: 'pointer',
              display: 'inline-flex',
              fontSize: 2,
              mb: 3,
              textDecoration: 'none',
              width: '100%',
            }}
          >
            <Box as={Search} size={[16, 20]} color="muted" mr={2} />
            Search
          </Box>
        </Box>

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

      <Keyboard />
    </Flex>
  )
}
