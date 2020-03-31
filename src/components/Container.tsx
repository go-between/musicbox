import React from 'react'
import { Box } from 'rebass'

export const Container: React.FC = ({ children }) => (
  <Box
    sx={{
      maxWidth: '1200px',
      mx: 'auto',
      px: 3,
    }}
  >
    {children}
  </Box>
)
