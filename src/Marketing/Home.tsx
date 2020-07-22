import React from 'react'
import { Box, Button, Flex, Heading, Image, Text } from 'rebass'

import { Container, Header } from 'components'
import Hero from 'images/hero.svg'

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        bg: 'white',
        color: 'modes.light.text',
      }}
    >
      <Header />

      <Container verticalSpace={6}>
        <Flex alignItems="center">
          <Box width="50%">
            <Heading
              as="h2"
              variant="headline"
              mb={3}
            >
              Discover the humans you work with one song at a time.
            </Heading>

            <Text
              sx={{fontSize: [3,4,5], color: 'gray700'}}
            >
              Music sparks conversations and memories that lead to deep, meaningful connections. And Musicbox is a remote-friendly place to listen, share, and discuss music with the folks on your team.
            </Text>
          </Box>

          <Box width="50%">
            <Image src= {Hero} width="100%" pl={4} />
          </Box>
        </Flex>
      </Container>

      <Box bg="gray200">
        <Container verticalSpace={6} width="800px">
          <Box sx={{ textAlign: 'center'}}>
            <Heading
              as="h2"
              variant="headline"
              sx={{mb: 3,}}
            >
              Don't copy &amp; paste your office
            </Heading>
            <Text sx={{fontSize: [3,4,5], color: 'gray700',}}>
              Musicbox provides a less awkward alternative to all those zoom calls, #random slack channels, and virtual happy hours.
            </Text>
            {/* <Text sx={{fontSize: [3,4,5], color: 'gray700'}} >
              In a tradtional office setting, connection is built incidentally, when you share a personal story on a coffee break or recap the weekend during team lunch. Informal conversations bring employees closer together and add to the culture of your company, but trying to recreate the physical world in a digital envrionment is the wrong approach.
            </Text> */}
          </Box>
        </Container>

        <Container verticalSpace={6}>
          <Flex>
            <Box px={3} width="50%">
              <Text sx={{color: 'primary', fontSize: [0,1], fontWeight: 'bold', mb: 2, textTransform: 'uppercase'}}>Listen</Text>
              <Heading variant="subHeadline" mb={3}>Music is better together</Heading>
              <Text sx={{fontSize: [3,4], color: 'gray700'}}>
                Musicbox lets remote teams listen to music together in real-time from the comfort of their home office, coffee shop, or beach—if that's your thing. Create rooms based on your team's listening preferenes and easily add songs from Youtube.
              </Text>
            </Box>

            <Box px={3} width="50%">
              <Image src="https://via.placeholder.com/450x250" />
            </Box>
          </Flex>
        </Container>

        <Container verticalSpace={6}>
          <Flex>
            <Box px={3} width="50%">
              <Image src="https://via.placeholder.com/450x250" />
            </Box>

            <Box px={3} width="50%">
              <Text sx={{color: 'primary', fontSize: [0,1], fontWeight: 'bold', mb: 2, textTransform: 'uppercase'}}>Share</Text>
              <Heading variant="subHeadline" mb={3}>Music is personal</Heading>
                <Text sx={{fontSize: [3,4], color: 'gray700', mb: 3}}>
                Musicbox provides an alternative to Spotify's faceless suggestion algorithm, because nothing compares to the feeling you get when an actual human suggests the perfect song. Asynchronously share music with your teammates, whether they're listening in real-time or catching back up on your recommendation after a meeting.</Text>
              {/* <Text sx={{fontSize: [3,4], color: 'gray700'}}>Queue up a song that someone inspired to you. Or you come across a song that your friend will like, but he's in a meeting. No worries, send them your recommendation and they can listen later, etc.</Text> */}
              {/* <Text sx={{fontSize: [3,4], color: 'gray700', mb: 3}}>Sure, Spotify's artificially intelligent super computers are really good at suggesting new music. And yes, the feeling you get when a faceless algortithm sends you a new song can be quite enjoyable. But that feeling is nothing compared to the one you get when a real, actual human, personally suggests the perfect song.</Text> */}
              {/* <Text>Sure, it's nice when Spotify's faceless algortithm suggests new music. But that feeling is nothing compared to the one you get when a real, actual human, personally suggests the perfect song. </Text> */}
              {/* <Text>Musicbox makes it easy to asynchronously share music with your teammates, whether they're listening in real-time or catching back up on your recommendation after a meeting. I mean, it's nice when Spotify's faceless algortithm suggests new music, that feeling is nothing compared to the one you get when an actual human suggests the perfect song.</Text> */}
            </Box>
          </Flex>
        </Container>

        <Container verticalSpace={6}>
          <Flex>
            <Box px={3} width="50%">
              <Text sx={{color: 'primary', fontSize: [0,1], fontWeight: 'bold', mb: 2, textTransform: 'uppercase'}}>Discuss</Text>
              {/* <Text sx={{bg: 'indigo100', borderRadius: 3, color: 'primary', display: 'inline-block', fontSize: [1], fontWeight: '600', mb: 2, p:1, textTransform: 'uppercase'}}>Discuss</Text> */}
              <Heading variant="subHeadline" mb={3}>Music is a great conversation starter</Heading>
              {/* <Text sx={{fontSize: [3,4], color: 'gray700'}}>This is where I want to talk about the things that music reminds me of: memories, concerts, experiences, etc.</Text>
              <Text sx={{fontSize: [3,4], color: 'gray700'}}>You totally saw this band in concert six years ago and something crazy happened. Share that memory with the rest of your team. Pin it to the song so the memory resurfaces every time the song is played.</Text> */}
              <Text sx={{fontSize: [3,4], color: 'gray700'}}>

              Musicbox adds fun and meaningful context to your teams conversations--creating a living history for each song. Messages shared with the room are automatically tied to the current song and can be saved so they reappear when that song is played again.

              {/* helps teams enhance your conversations with fun stories and meaninful context. Like that Bon Iver concert that reminded you why they're the greatest band of all time. Or how the Space Jam theme song brings back some of your favorite childhood memories.

              Musicbox turns your giving each song it's own living history. Each message You can even pin messgages to a song so it gets re-surfaced every time it's played! */}
              </Text>
            </Box>

            <Box px={3} width="50%">
              <Image src="https://via.placeholder.com/450x250" />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* <Container verticalSpace={6}>
        <Flex>
          <Image src="https://via.placeholder.com/450x250" />

          <Box width="50%">
            <Text sx={{color: 'primary', fontSize: [1, 2], fontWeight: 'bold', mb: 2, textTransform: 'uppercase'}}>Discuss</Text>
            <Heading>Feel less alone</Heading>
            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus accusantium amet quae debitis enim tenetur earum, aliquam quis aspernatur vitae, labore beatae? Culpa architecto quis, officiis accusantium fugiat delectus id?</Text>
          </Box>

        </Flex>
      </Container> */}

      <Box bg="gray900" color="gray400">
        <Container verticalSpace={6} width="800px">
          <Box sx={{textAlign: 'center'}}>
            <Heading
              as="h2"
              variant="headline"
              mb={4}
              color="gray200"
            >
              Start Jamming today.
            </Heading>
            <Text sx={{fontSize: [3,4,5], color: 'gray500', mb: 4,}}>Musicbox is a fun and informal way for you and your team to feel a little closer, a little less lonely, and a lot more connected.</Text>
            <Button>Request Access</Button>
          </Box>
        </Container>
      </Box>


      {/* <Box bg="background">
        <Container verticalSpace={6}>

        </Container>
      </Box> */}
    </Box>
  )
}

export default Home


// Musicbox offers provides a new, remote first way to listen to music.
// is designed to help remote teams connect with their co-workers through music.