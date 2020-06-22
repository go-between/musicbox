import React from 'react'
import { Box, Flex, Heading, Text } from 'rebass'

import { Logo } from 'components/Logo'
// import Container from 'components/Container'
// import Header from 'components/Header'
// import Footer from 'components/Footer'

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        bg: 'white',
        color: 'modes.light.text',
      }}
    >
      {/* <Header />
      <Container> */}
      <Box
        as="header"
        sx={{
          borderBottom: '1px solid',
          borderColor: 'gray200',
          py: 3,
          px: 4
        }}
      >
        <Logo />
        <Box as="ul">
          <Box as="li">
            <Box>About</Box>
          </Box>

          <Box as="li">
            <Box>About</Box>
          </Box>
        </Box>
      </Box>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            py: 4,
          }}
        >
          <Box
            sx={{
              width: ['100%', '70%']
            }}
          >
            <Heading
              as="h2"
              variant="headline"
              mb={3}
            >
              Collaborative listening experiences for remote teams.
            </Heading>

            <Text
              fontSize={[3,5,6]}
            >
              Musicbox is designed to help remote teams connect with their co-workers through music.
            </Text>
          </Box>
        </Box>

        <Flex alignItems="flex-start">
          <Box>
            <Heading>Designed for Remote teams</Heading>
            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et vel atque deleniti, rem aspernatur incidunt perferendis, pariatur cum autem blanditiis fugit nam voluptates non laboriosam ipsam labore. Fugit, unde recusandae.</Text>
          </Box>
        </Flex>
      {/* </Container> */}
      {/* <Footer /> */}
    </Box>
  )
}

export default Home
