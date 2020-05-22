import React from 'react'
import { Box, Text } from 'rebass'

const Manifesto: React.FC = () => {
  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: 'auto',
        py: [5, 6],
        px: [3, 4],
      }}
    >
      <Text
        as="p"
        fontSize={4}
      >
        Sure, I love getting that perfect, algorithmically recommended song as much the next person, but nothing beats either personally receiving or recommending the perfect song to a friend, family member, or co-worker. Nothing beats listening and sharing music with real, human people that learn your preferences
      </Text>
      <Text>
        test
      </Text>
    </Box>
  )
}

export default Manifesto
