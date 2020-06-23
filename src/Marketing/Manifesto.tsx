import React from 'react'
import { Box, Heading, Link, Text } from 'rebass'

import { Header } from 'components'

const Manifesto: React.FC = () => {
  return (
    <Box
      sx={{
        bg: 'white',
        color: 'modes.light.text'
      }}
    >
      <Header>
        <Box as="nav">
          <Link>Manifesto</Link>
          <Link>Sign In</Link>
          <Link>Sign Up</Link>
        </Box>
      </Header>

      <Box
        sx={{
          maxWidth: 780,
          mx: 'auto',
          py: [5, 6],
          px: [3, 4],
        }}
      >
        <Box mb={4}>
          <Heading as="h2" variant="headline">Hi, we're Musicbox...</Heading>
        </Box>

        <Text
          as="p"
          variant="body"
        >
          And we love music&mdash;like, we really, really love it.
        </Text>

        <Text
          as="p"
          variant="body"
        >
          Sure, I love getting that perfect, algorithmically recommended song as much the next person, but nothing beats either personally receiving or recommending the perfect song to a friend, family member, or co-worker. Nothing beats listening and sharing music with real, human people that learn your preferences
        </Text>

        <Box py={4}>
          <Text>See you soon!</Text>
          <Text>&mdash; Dan &amp; Truman</Text>
        </Box>

        <Box py={4}>
          <Text as="p" variant="body">
            If this story resonated with you, and Musicbox sounds like something that would bring you joy, then drop us a line! We'd love to help you and your friends start jamming.
          </Text>
        </Box>

        <Box as="footer">
          Copyright ©2020 Musicbox.
          All rights reserved.
        </Box>
      </Box>
    </Box>
  )
}

export default Manifesto
