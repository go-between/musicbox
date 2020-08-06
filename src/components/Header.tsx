import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Button, Flex, Link, Text } from 'rebass'

import { Container, Logo } from '.'
import LogoLightMode from 'images/musicbox-mark.svg'

export const Header: React.FC = () => {
  const history = useHistory()
  const navigate = (to: string) => (ev: React.MouseEvent) => {
    ev.preventDefault()
    history.push(to)
  }

  return (
    <Box
      as="header"
      sx={{
        textAlign: 'center',
        width: '100%',
      }}
    >
      <Container>
        <Flex
          sx={{
            alignItems: 'center',
            borderBottom: '1px solid',
            borderColor: 'gray200',
            justifyContent: 'space-between',
            py: 3,
          }}
        >
          <Flex as="a" href="/" sx={{ alignItems: 'center', textDecoration: 'none' }}>
            <Logo imageSrc={LogoLightMode} width="40px" />
            <Text sx={{ color: 'gray800', fontSize: 3, textTransform: 'uppercase', fontWeight: 800, px: 2 }}>
              Musicbox
            </Text>
          </Flex>

          <Flex as="nav" sx={{ alignItems: 'center' }}>
            {/* <Link
              onClick={navigate('features')}
              sx={{
                fontSize: [2,3],
                pl: [3, 4],
              }}
            >
              Features
            </Link> */}

            <Link
              onClick={navigate('liner-notes')}
              variant="link"
              sx={{
                fontSize: [2, 3],
                pl: [3, 4],
              }}
            >
              About Us
            </Link>

            <Link
              onClick={navigate('login')}
              sx={{
                fontSize: [2, 3],
                pl: [3, 4],
              }}
            >
              Login
            </Link>

            <Link
              onClick={navigate('signup')}
              sx={{
                pl: [3, 4],
              }}
            >
              <Button
                sx={{
                  bg: 'transparent',
                  border: '2px solid',
                  borderColor: 'primary',
                  color: 'primary',
                  fontSize: [1, 2],
                  '&:hover': {
                    bg: 'primary',
                    color: 'white',
                  },
                }}
              >
                Sign Up
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
