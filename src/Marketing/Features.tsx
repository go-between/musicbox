import React from 'react'
import { Box, Heading, Text } from 'rebass'

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

// Sure, I love getting that perfect, algorithmically recommended song as much the next person, but nothing beats either personally receiving or recommending the perfect song to a friend, family member, or co-worker. Nothing beats listening and sharing music with real, human people that learn your preferences
