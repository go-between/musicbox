import React from 'react'
import { Search } from 'react-feather'
import { Box, Flex, Link, Text } from 'rebass'
import { useHistory } from 'react-router-dom'
import Gravatar from 'react-gravatar'

import { useUserContext } from 'Context'
import { Logo } from 'components'
import LogoDarkMode from 'images/musicbox-mark-purple.svg'
import { useJumpNavigationContext } from 'JumpMenu'

export const AppHeader: React.FC = () => {
  const user = useUserContext()
  const { show } = useJumpNavigationContext()
  const history = useHistory()
  const navigate = (to: string) => (ev: React.MouseEvent) => {
    ev.preventDefault()
    history.push(to)
  }

  return (
    <>
      <Flex
        as="header"
        sx={{
          alignItems: 'center',
          bg: 'accentHover',
          justifyContent: 'space-between',
          p: [3],
          width: '100%',
        }}
      >
        <Logo imageSrc={LogoDarkMode} width="42px" />

        <Flex
          onClick={show}
          sx={{
            alignItems: 'center',
            bg: 'accent',
            borderRadius: 6,
            color: 'gray500',
            cursor: 'pointer',
            py: 2,
            px: 3,
            mx: 3,
            flex: [1],
            maxWidth: ['100%', '50%'],
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
          >
            Search for Music
          </Text>
        </Flex>

        <Flex as={Link} onClick={navigate('/user-settings')}>
          <Gravatar email={user.email} size={36} style={{ borderRadius: '100%' }} alt={user.email} />
        </Flex>
      </Flex>
    </>
  )
}
