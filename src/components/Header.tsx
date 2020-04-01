import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Button, Flex, Link } from 'rebass'

import Container from './Container'
import Logo from 'components/Logo'

const Header: React.FC = () => {
  const history = useHistory()
  const navigate = (to: string) => (ev: React.MouseEvent) => {
    ev.preventDefault()
    history.push(to)
  }

  return (
    <>
      <Box
        as="header"
        sx={{
          bg: 'modes.light.background',
          color: 'modes.light.text',
          // borderBottom: '1px solid',
          // borderColor: 'modes.light.accent',
          boxShadow: 'base',
          py: 3,
        }}
      >
        <Container>
          <Flex
            alignItems='center'
            justifyContent="space-between"
          >
            <Logo />

            <Flex alignItems='center'>
              <Link
                onClick={navigate('/login')}
                mr={3}
              >
                Login
              </Link>

              <Button
                onClick={navigate('/signup')}
                variant="mini"
              >
                Sign Up!
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  )
}

export default Header


