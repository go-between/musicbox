import React from 'react'
import { Box, Flex } from 'rebass'

import { Logo } from 'components'
import LogoLightMode from 'images/musicbox-logo-dark.svg'

export const Header: React.FC = ({ children }) => (
  <Flex
    as="header"
    sx={{      
      alignItems: 'center',        
      boxShadow: 'xl',
      justifyContent: 'space-between',
      py: 3,
      px: 4,
      width: '100%',
    }}
  >
    <Box>
      <Logo imageSrc={LogoLightMode} />
    </Box>
  
    <Flex>
      {children}
    </Flex>    
  </Flex>
)
