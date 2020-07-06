import React from 'react'
import { Box } from 'rebass'

export const Container: React.FC = ({ children }) => (
  <Box
    sx={{
      maxWidth: '1024px',
      mx: 'auto',
    }}
  >
    {children}
  </Box>
)
