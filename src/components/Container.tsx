import React from 'react'
import { Box } from 'rebass'

const Container: React.FC = ({children}) => (
  <Box
    sx={{
      maxWidth: '1024px',
      mx: 'auto',
      px: 3,
    }}
  >
    {children}
  </Box>
)

export default Container
