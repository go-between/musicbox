import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Box, Button, Flex, Link, Text } from 'rebass'

import { Logo } from '.'
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
        // boxShadow: 'lg',              
        textAlign: 'center',
        width: '100%',
      }}
    >
      <Flex 
        sx={{
          alignItems: 'center',        
          borderBottom: '1px solid',
          borderColor: 'gray200',
          justifyContent: 'space-between',
          maxWidth: '1024px',
          m: '0 auto',
          px: 4,
          py: 3,  
        }}
      >
        <Flex as="a" href="/" sx={{alignItems: 'center',  textDecoration: 'none'}}>
          <Logo imageSrc={LogoLightMode} width='40px' />
          <Text sx={{color: 'gray800', fontSize: 3, textTransform: 'uppercase', fontWeight: 800, px: 2}}>Musicbox</Text>
        </Flex>
      
        <Flex as="nav" sx={{alignItems: 'center'}}>
          <Link onClick={navigate('features')}>Features</Link>
          
          <Link 
            onClick={navigate('liner-notes')}
            variant="link"
            sx={{
              fontSize: [2,3],
              pl: 3,
          }}>
            Liner Notes
          </Link>

          <Link 
            onClick={navigate('login')}
            sx={{
              fontSize: [2,3],
              pl: 3,
          }}>
            Login
          </Link>

          <Link 
            onClick={navigate('signup')}
            sx={{              
              pl: 3,
          }}>
            <Button 
              sx={{
                fontSize: [2, 3],
              }}
            >
              Get Started
            </Button>            
          </Link>
        </Flex>    
      </Flex>
    </Box>
  )
}
