import React from 'react'
import { Box, Button, Flex, Heading, Image, Text } from 'rebass'

import { Container, Header, Footer } from 'components'
import Hero from 'images/hero.png'
import Listen from 'images/listen-dots.png'
import Share from 'images/share-dots.png'
import Discuss from 'images/discuss-dots.png'
import Waves from 'images/waves-2.svg'
import WavesPurple from 'images/wave-purple-2.svg'
import CopyPaste from 'images/copy-paste.png'

// const signalPathDark = `"data:image/svg+xml,%3Csvg width='84' height='48' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z' fill='%232d3748' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E"`

// const signalPathPurple = `"data:image/svg+xml,%3Csvg width='84' height='48' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z' fill='%233c366b' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E"`

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

            <Text sx={{ fontSize: [3, 4, 5], color: 'gray700', mb: 4 }}>
              Music sparks conversations and memories that lead to deep, meaningful connections. And Musicbox is a
              remote-friendly place to listen, share, and discuss music with the folks on your team.
            </Text>

            <Button>Get Started!</Button>
          </Box>

          <Box width={['100%', '100%', '50%']} my={[4, 4, 0]}>
            <Image src={Hero} width="100%" pl={[0, 4]} />
          </Box>
        </Flex>
      </Container>

      {/* <Box>
        <Container verticalSpace={4}>
          <Box
            sx={{
              bg: 'indigo800',
              backgroundImage: [`url(${WavesPurple})`],
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              borderRadius: 6,
              boxShadow: 'xl',
              color: 'indigo200',
              py: [4, 5],
              px: [2, 5],
              textAlign: 'center',
            }}
          >
            <Heading as="h2" variant="headline" sx={{ color: 'white', mb: 3 }}>
              Don&#39;t copy &amp; paste your office
            </Heading>
            <Text sx={{ fontSize: [4, 5, 6], color: 'indigo100' }}>
              Musicbox provides a less awkward alternative to all those zoom calls, #random slack channels, and virtual
              happy hours.
            </Text>
          </Box>
        </Container>
      </Box> */}

      <Box>
        <Container verticalSpace={5}>
          <Box sx={{ textAlign: 'center' }}>
            <Heading as="h2" variant="headline" sx={{ color: 'gray800', mb: 3 }}>
              Don&#39;t copy &amp; paste your office
            </Heading>
            <Text sx={{ fontSize: [4, 5, 6], color: 'gray600', mb: 4, mx: 'auto', width: ['100%', '80%', '70%'] }}>
              Musicbox is a better alternative to all those zoom calls, #random slack channels, and virtual happy hours.
            </Text>
          </Box>

          <Image src={CopyPaste} />
        </Container>
      </Box>

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
                coffee shop, or beach—if that&#39;s your thing. Create rooms based on your team&#39;s listening
                preferences and easily add songs from YouTube.
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
                Musicbox provides an alternative to Spotify&#39;s faceless suggestion algorithm, because nothing
                compares to the feeling you get when an actual human suggests the perfect song. Asynchronously share
                music with your teammates, whether they&#39;re listening in real-time or catching back up on your
                recommendation after a meeting.
              </Text>
            </Box>
          </Flex>
        </Container>

        <Container verticalSpace={[4, 6]}>
          <Flex alignItems="center" flexDirection={['column', 'row', 'row']}>
            <Box width={['100%', '50%', '50%']}>
              <Text sx={{ color: 'primary', fontSize: [0, 1], fontWeight: 'bold', mb: 2, textTransform: 'uppercase' }}>
                Discuss
              </Text>
              <Heading variant="subHeadline" mb={3}>
                Music is a great conversation starter
              </Heading>
              <Text sx={{ fontSize: [3, 4, 5], color: 'gray700' }}>
                Musicbox adds fun and meaningful context to your teams conversations--creating a living history for each
                song. Messages shared with the room are automatically tied to the current song and can be saved so they
                reappear when that song is played again.
              </Text>
            </Box>

            <Box width={['100%', '50%', '50%']}>
              <Image src={Discuss} width="100%" pl={[0, 4]} py={[4, 0]} />
            </Box>
          </Flex>
        </Container>
      </Box>

      <Box
        sx={{
          backgroundColor: ['indigo700', 'gray100'],
          backgroundImage: [`url(${WavesPurple})`],
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          textAlign: 'center',
        }}
      >
        <Container verticalSpace={[4, 6]}>
          <Heading as="h2" variant="headline" mb={[4]} mt={[4, 0]} color="white">
            But wait, there&#39;s more!
          </Heading>
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
                <Heading>Keyboard Shortcuts</Heading>
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
                <Heading>Library Management</Heading>
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
                <Heading>Living Song History</Heading>
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

      {/* <Box
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
      </Box> */}

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
