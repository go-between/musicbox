import React from 'react'
import { Box } from 'rebass'

import { Header } from 'components'

const Features: React.FC = () => {
  return (
    <Box
      sx={{
        bg: 'white',
        color: 'modes.light.text',
      }}
    >
      <Header />

      <Box
        sx={{
          maxWidth: 680,
          mx: 'auto',
          py: [5, 6],
          px: [4],
        }}
      >
        Features!
      </Box>
    </Box>
  )
}

export default Features
