import React from 'react'
import { Box, Button, Flex, Heading, Image, Text } from 'rebass'

import { Container, Header, Footer } from 'components'
import Hero from 'images/hero.png'
import Listen from 'images/listen-dots.png'
import Share from 'images/share-dots.png'
import Discuss from 'images/discuss-dots.png'
import Waves from 'images/waves-2.svg'
import WavesPurple from 'images/wave-purple.svg'

const signalPathDark = `"data:image/svg+xml,%3Csvg width='84' height='48' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z' fill='%232d3748' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E"`

const signalPathPurple = `"data:image/svg+xml,%3Csvg width='84' height='48' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z' fill='%233c366b' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E"`

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        bg: 'white',
        color: 'modes.light.text',
      }}
    >
      <Header />

      <Container verticalSpace={[5, 5, 6]}>
        <Flex alignItems="center" flexDirection={['column', 'column', 'row']}>
          <Box width={['100%', '100%', '50%']}>
            <Heading as="h2" variant="headline" mb={3}>
              Discover the humans you work with one song at a time.
            </Heading>

            <Text sx={{ fontSize: [3, 4, 5], color: 'gray700' }}>
              Music sparks conversations and memories that lead to deep, meaningful connections. And Musicbox is a
              remote-friendly place to listen, share, and discuss music with the folks on your team.
            </Text>
          </Box>

          <Box width={['100%', '100%', '50%']} my={[4, 4, 0]}>
            <Image src={Hero} width="100%" pl={[0, 4]} />
          </Box>
        </Flex>
      </Container>

      {/* <Box
        sx={{
          bg: 'indigo800',
          color: 'indigo200'
        }}
      >
        <Container verticalSpace={6} width="800px">
          <Box sx={{ textAlign: 'center'}}>
            <Heading
              as="h2"
              variant="headline"
              sx={{color: 'indigo200', mb: 3,}}
            >
              Don't copy &amp; paste your office
            </Heading>
            <Text sx={{fontSize: [4,5,6], color: 'indigo200',}}>
              Musicbox provides a less awkward alternative to all those zoom calls, #random slack channels, and virtual happy hours.
            </Text>
          </Box>
        </Container>
      </Box> */}

      <Box
        sx={{
          bg: 'gray100',
          backgroundImage: [
            `url(${Waves}), linear-gradient(to bottom, #fff 2%, #F7Fafc 2%)`,
            `url(${Waves}), linear-gradient(to bottom, #fff 3%, #F7Fafc 3%)`,
            `url(${Waves}), linear-gradient(to bottom, #fff 5%, #F7Fafc 5%)`,
            `url(${Waves}), linear-gradient(to bottom, #fff 7%, #F7Fafc 7%)`,
          ],
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'top',
        }}
      >
        <Container verticalSpace={[4, 6]}>
          <Flex alignItems="center" flexDirection={['column', 'row', 'row']}>
            <Box width={['100%', '50%', '50%']}>
              <Text sx={{ color: 'primary', fontSize: [0, 1], fontWeight: 'bold', mb: 2, textTransform: 'uppercase' }}>
                Listen
              </Text>
              <Heading variant="subHeadline" mb={3}>
                Music is better together
              </Heading>
              <Text sx={{ fontSize: [3, 4, 5], color: 'gray700' }}>
                Musicbox lets remote teams listen to music together in real-time from the comfort of their home office,
                coffee shop, or beach—if that's your thing. Create rooms based on your team's listening preferences and
                easily add songs from YouTube.
              </Text>
            </Box>

            <Box width={['100%', '50%', '50%']}>
              <Image src={Listen} width="100%" pl={[0, 4]} py={[4, 0]} />
            </Box>
          </Flex>
        </Container>

        <Container verticalSpace={[4, 6]}>
          <Flex alignItems="center" flexDirection={['column', 'row', 'row']}>
            <Box
              sx={{
                order: [2, 1],
                width: ['100%', '50%', '50%'],
              }}
            >
              <Image src={Share} width="100%" pr={[0, 4]} py={[4, 0]} />
            </Box>

            <Box
              sx={{
                order: [1, 2],
                width: ['100%', '50%', '50%'],
              }}
            >
              <Text sx={{ color: 'primary', fontSize: [0, 1], fontWeight: 'bold', mb: 2, textTransform: 'uppercase' }}>
                Share
              </Text>
              <Heading variant="subHeadline" mb={3}>
                Music is personal
              </Heading>
              <Text sx={{ fontSize: [3, 4, 5], color: 'gray700' }}>
                Musicbox provides an alternative to Spotify's faceless suggestion algorithm, because nothing compares to
                the feeling you get when an actual human suggests the perfect song. Asynchronously share music with your
                teammates, whether they're listening in real-time or catching back up on your recommendation after a
                meeting.
              </Text>
              {/* <Text sx={{fontSize: [3,4], color: 'gray700'}}>Queue up a song that someone inspired to you. Or you come across a song that your friend will like, but he's in a meeting. No worries, send them your recommendation and they can listen later, etc.</Text> */}
              {/* <Text sx={{fontSize: [3,4], color: 'gray700', mb: 3}}>Sure, Spotify's artificially intelligent super computers are really good at suggesting new music. And yes, the feeling you get when a faceless algortithm sends you a new song can be quite enjoyable. But that feeling is nothing compared to the one you get when a real, actual human, personally suggests the perfect song.</Text> */}
              {/* <Text>Sure, it's nice when Spotify's faceless algortithm suggests new music. But that feeling is nothing compared to the one you get when a real, actual human, personally suggests the perfect song. </Text> */}
              {/* <Text>Musicbox makes it easy to asynchronously share music with your teammates, whether they're listening in real-time or catching back up on your recommendation after a meeting. I mean, it's nice when Spotify's faceless algortithm suggests new music, that feeling is nothing compared to the one you get when an actual human suggests the perfect song.</Text> */}
            </Box>
          </Flex>
        </Container>

        <Container verticalSpace={[4, 6]}>
          <Flex alignItems="center" flexDirection={['column', 'row', 'row']}>
            <Box width={['100%', '50%', '50%']}>
              <Text sx={{ color: 'primary', fontSize: [0, 1], fontWeight: 'bold', mb: 2, textTransform: 'uppercase' }}>
                Discuss
              </Text>
              {/* <Text sx={{bg: 'indigo100', borderRadius: 3, color: 'primary', display: 'inline-block', fontSize: [1], fontWeight: '600', mb: 2, p:1, textTransform: 'uppercase'}}>Discuss</Text> */}
              <Heading variant="subHeadline" mb={3}>
                Music is a great conversation starter
              </Heading>
              {/* <Text sx={{fontSize: [3,4], color: 'gray700'}}>This is where I want to talk about the things that music reminds me of: memories, concerts, experiences, etc.</Text>
              <Text sx={{fontSize: [3,4], color: 'gray700'}}>You totally saw this band in concert six years ago and something crazy happened. Share that memory with the rest of your team. Pin it to the song so the memory resurfaces every time the song is played.</Text> */}
              <Text sx={{ fontSize: [3, 4, 5], color: 'gray700' }}>
                Musicbox adds fun and meaningful context to your teams conversations--creating a living history for each
                song. Messages shared with the room are automatically tied to the current song and can be saved so they
                reappear when that song is played again.
                {/* helps teams enhance your conversations with fun stories and meaninful context. Like that Bon Iver concert that reminded you why they're the greatest band of all time. Or how the Space Jam theme song brings back some of your favorite childhood memories.

              Musicbox turns your giving each song it's own living history. Each message You can even pin messgages to a song so it gets re-surfaced every time it's played! */}
              </Text>
            </Box>

            <Box width={['100%', '50%', '50%']}>
              <Image src={Discuss} width="100%" pl={[0, 4]} py={[4, 0]} />
            </Box>
          </Flex>
        </Container>
      </Box>

      <Box sx={{ bg: 'gray100', textAlign: 'center' }}>
        <Container verticalSpace={[4, 6]}>
          <Heading as="h2" variant="headline" mb={3}>
            But wait, there's more!
          </Heading>
          <Text sx={{ fontSize: [4, 5, 6], mb: 4, color: 'gray700' }}>
            Here are some additional features that you might find super cool.
          </Text>

          <Flex sx={{ flexDirection: ['column', 'row'], flexWrap: 'wrap' }}>
            <Box sx={{ flex: [1, '50%', '25%'], px: 2, py: [2, 2, 0] }}>
              <Box
                sx={{
                  bg: 'white',
                  borderRadius: 6,
                  boxShadow: 'xl',
                  p: 4,
                  textAlign: 'left',
                }}
              >
                <Heading>Remote First Design</Heading>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus id rem maiores animi sit
                  cupiditate neque.
                </Text>
              </Box>
            </Box>

            <Box sx={{ flex: [1, '50%', '25%'], px: 2, py: [2, 2, 0] }}>
              <Box
                sx={{
                  bg: 'white',
                  borderRadius: 6,
                  boxShadow: 'xl',
                  p: 4,
                  textAlign: 'left',
                }}
              >
                <Heading>Remote First Design</Heading>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus id rem maiores animi sit
                  cupiditate neque.
                </Text>
              </Box>
            </Box>

            <Box sx={{ flex: [1, '50%', '25%'], px: 2, py: [2, 2, 0] }}>
              <Box
                sx={{
                  bg: 'white',
                  borderRadius: 6,
                  boxShadow: 'xl',
                  p: 4,
                  textAlign: 'left',
                }}
              >
                <Heading>Remote First Design</Heading>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus id rem maiores animi sit
                  cupiditate neque.
                </Text>
              </Box>
            </Box>

            <Box sx={{ flex: [1, '50%', '25%'], px: 2, py: [2, 2, 0] }}>
              <Box
                sx={{
                  bg: 'white',
                  borderRadius: 6,
                  boxShadow: 'xl',
                  p: 4,
                  textAlign: 'left',
                }}
              >
                <Heading>Remote First Design</Heading>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus id rem maiores animi sit
                  cupiditate neque.
                </Text>
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>

      <Box
        sx={{
          backgroundColor: 'gray100',
          backgroundImage: [`url(${WavesPurple})`],
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'top',
        }}
      >
        <Container verticalSpace={6} width="800px">
          <Box sx={{ textAlign: 'center' }}>
            <Heading as="h2" variant="headline" mb={4} color="white">
              Start Jamming today.
            </Heading>
            <Text sx={{ fontSize: [4, 5, 6], color: 'white', mb: 4 }}>
              Musicbox is a fun and informal way for your team to feel a little less lonely, and a lot more connected.
            </Text>
            <Button>Request Access</Button>
          </Box>
        </Container>
      </Box>

      {/* <Box color="gray400"
        sx={{
          backgroundColor: 'background',
          backgroundImage: `url(${signalPathDark})`
        }}
      >
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
            <Text sx={{fontSize: [4,5,6], color: 'gray500', mb: 4,}}>Musicbox is a fun and informal way for your team to feel a little less lonely, and a lot more connected.</Text>
            <Button>Request Access</Button>
          </Box>
        </Container>
      </Box> */}

      <Footer />
    </Box>
  )
}

export default Home

// Musicbox offers provides a new, remote first way to listen to music.
// is designed to help remote teams connect with their co-workers through music.

{
  /* <Text sx={{fontSize: [3,4,5], color: 'gray700'}} >
  In a tradtional office setting, connection is built incidentally, when you share a personal story on a coffee break or recap the weekend during team lunch. Informal conversations bring employees closer together and add to the culture of your company, but trying to recreate the physical world in a digital envrionment is the wrong approach.
</Text> */
}
