import React from 'react'
import { Box } from 'rebass'

const Container: React.FC = ({ children }) => (
  <Box
    sx={{
      maxWidth: '1200px',
      mx: 'auto',
      px: [3, 4],
    }}
  >
    {children}
  </Box>
)

export default Container
