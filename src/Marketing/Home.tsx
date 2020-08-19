import React from 'react'
import { Box, Button, Flex, Heading, Image, Text } from 'rebass'
import { Input } from '@rebass/forms'
import { Command, Grid, Inbox, Music } from 'react-feather'

import { Container, Header, Footer } from 'components'
import Hero from 'images/hero.png'
import Listen from 'images/listen-dots.png'
import Share from 'images/share-dots.png'
import Discuss from 'images/discuss-dots.png'
import WavesLightGray from 'images/wave-light-gray.svg'
import WavePurple from 'images/wave-purple.png'
import CopyPaste from 'images/copy-paste.png'
import QuotationMark from 'images/quotation-mark.svg'

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

      <Container verticalSpace={[4, 5, 6]}>
        <Flex alignItems="center" flexDirection={['column', 'row', 'row']}>
          <Box width={['100%', '60%', '50%']}>
            <Heading as="h2" variant="headline" mb={3}>
              Discover the humans you work with, one song at a time.
            </Heading>

            <Text as="p" sx={{ fontSize: [3, 4, 5], color: 'gray600', mb: 3 }}>
              Music sparks conversations and memories that lead to deep, meaningful connections. And Musicbox is a
              remote-friendly place to listen, share, and discuss music with the folks on your team.
            </Text>

            {/* <Text as='p' sx={{ fontSize: [2,3,4], color: 'gray600', mb: 3 }}>Want to get early access? Just leave your email below, and we'll add you to the beta list. </Text> */}

            {/* <Flex alignItems="center" width="100%" justifyContent="space-between">
              <Box sx={{ flex: 1 }}>
                <Input
                  sx={{
                    bg: 'white',
                    borderTop: '1px solid',
                    borderColor: 'gray300',
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    color: 'gray600',
                    py: 3,
                    height: '58px',
                    '&::placeholder': {
                      color: 'gray500',
                      fontSize: 2,
                    },
                  }}
                  placeholder="Enter your email"
                />
              </Box>

              <Button
                sx={{
                  alignItems: 'center',
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  display: 'flex',
                  height: '58px',
                }}
              >
                Get Early Access
              </Button>
            </Flex> */}
          </Box>

          <Box width={['75%', '40%', '50%']} mx={['auto']} my={[4, 4, 0]}>
            <Image src={Hero} width="100%" pl={[0, 4]} />
          </Box>
        </Flex>
      </Container>

      <Box
        sx={{
          backgroundImage: [
            `url(${WavesLightGray}), linear-gradient(to bottom, #fff 2%, #F7Fafc 2%)`,
            `url(${WavesLightGray}), linear-gradient(to bottom, #fff 3%, #F7Fafc 3%)`,
            `url(${WavesLightGray}), linear-gradient(to bottom, #fff 4%, #F7Fafc 4%)`,
            `url(${WavesLightGray}), linear-gradient(to bottom, #fff 5%, #F7Fafc 5%)`,
          ],
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'top',
        }}
      >
        <Container verticalSpace={[4, 5, 6]}>
          <Box sx={{ textAlign: 'center' }}>
            <Heading as="h2" variant="headline" sx={{ color: 'gray800', mb: 3 }}>
              Why Musicbox?
            </Heading>
            <Text
              as="p"
              sx={{ fontSize: [3, 4, 5], color: 'gray700', mb: 4, mx: 'auto', width: ['100%', '80%', '70%'] }}
            >
              Because you can&#39;t copy and paste your physical office and expect the same results. Musicbox takes a
              remote first approach to connecting with your co-workers.
            </Text>
          </Box>

          <Image src={CopyPaste} />
        </Container>

        <Container verticalSpace={[4, 5, 6]}>
          <Flex alignItems="center" flexDirection={['column', 'row', 'row']}>
            <Box width={['100%', '50%', '50%']}>
              <Text sx={{ color: 'primary', fontSize: [0, 1], fontWeight: 'bold', mb: 2, textTransform: 'uppercase' }}>
                Listen
              </Text>
              <Heading variant="subHeadline" mb={3}>
                Music is better together
              </Heading>
              <Text sx={{ fontSize: [3, 4, 5], color: 'gray700', mb: 3 }}>
                Musicbox lets remote teams listen to music together in real-time from the comfort of their home office,
                coffee shop, or beach—if that&#39;s your thing.
              </Text>

              <Text sx={{ fontSize: [3, 4, 5], color: 'gray700' }}>
                Create rooms based on your team&#39;s listening preferences and easily add songs from YouTube.
              </Text>
            </Box>

            <Box width={['100%', '50%', '50%']}>
              <Image src={Listen} width="100%" pl={[0, 4]} py={[4, 0]} />
            </Box>
          </Flex>
        </Container>

        <Container verticalSpace={[4, 5, 6]}>
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
              <Text sx={{ fontSize: [3, 4, 5], color: 'gray700', mb: 3 }}>
                Musicbox provides an alternative to Spotify&#39;s faceless suggestion algorithm, because nothing
                compares to the feeling you get when an actual human suggests the perfect song.
              </Text>
              <Text sx={{ fontSize: [3, 4, 5], color: 'gray700' }}>
                Asynchronously share music with your teammates, whether they&#39;re listening in real-time or catching
                back up on your recommendation after a meeting.
              </Text>
            </Box>
          </Flex>
        </Container>

        <Container verticalSpace={[4, 5, 6]}>
          <Flex alignItems="center" flexDirection={['column', 'row', 'row']}>
            <Box width={['100%', '50%', '50%']}>
              <Text sx={{ color: 'primary', fontSize: [0, 1], fontWeight: 'bold', mb: 2, textTransform: 'uppercase' }}>
                Discuss
              </Text>
              <Heading variant="subHeadline" mb={3}>
                Music is a conversation starter
              </Heading>
              <Text sx={{ fontSize: [3, 4, 5], color: 'gray700', mb: 3 }}>
                Musicbox adds fun and meaningful context to your teams conversations--creating a living history for each
                song.
              </Text>
              <Text sx={{ fontSize: [3, 4, 5], color: 'gray700' }}>
                Messages shared with the room are automatically tied to the current song and can be saved so they
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
          bg: 'gray100',
          textAlign: 'center',
        }}
      >
        <Container verticalSpace={[4, 5]}>
          <Heading as="h2" variant="headline" mb={[4]} mt={[4, 0]} color="gray800">
            But wait, there&#39;s more!
          </Heading>
          <Flex sx={{ flexDirection: ['column', 'row'], flexWrap: 'wrap' }}>
            <Box sx={{ flex: [1, '50%', '25%'], px: 2, py: [2, 2, 0] }}>
              <Box
                sx={{
                  bg: 'white',
                  borderRadius: 6,
                  boxShadow: 'md',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  color: 'gray600',
                  px: 3,
                  py: 4,
                  textAlign: 'left',
                }}
              >
                <Box as={Command} sx={{ color: 'indigo600', mb: 2 }} />
                <Heading sx={{ color: 'gray800', fontSize: 3, fontWeight: '600', mb: 1 }}>Keyboard Shortcuts</Heading>
                <Text sx={{ color: 'gray600', fontSize: 2 }}>
                  Designed for speed, so you can queue up the perfect playlist and get back into your flow.
                </Text>
              </Box>
            </Box>

            <Box sx={{ flex: [1, '50%', '25%'], px: 2, py: [2, 2, 0] }}>
              <Box
                sx={{
                  bg: 'white',
                  borderRadius: 6,
                  boxShadow: 'md',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  px: 3,
                  py: 4,
                  textAlign: 'left',
                }}
              >
                <Box as={Inbox} sx={{ color: 'indigo600', mb: 2 }} />
                <Heading sx={{ color: 'gray800', fontSize: 3, fontWeight: '600', mb: 1 }}>Library Management</Heading>
                <Text sx={{ color: 'gray600', fontSize: 2 }}>
                  Tag and organize your music so it&#39;s easier to find and recommend or play a song for your
                  co-workers.
                </Text>
              </Box>
            </Box>

            <Box sx={{ flex: [1, '50%', '25%'], px: 2, py: [2, 2, 0] }}>
              <Box
                sx={{
                  bg: 'white',
                  borderRadius: 6,
                  boxShadow: 'md',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  px: 3,
                  py: 4,
                  textAlign: 'left',
                }}
              >
                <Box as={Music} sx={{ color: 'indigo600', mb: 2 }} />
                <Heading sx={{ color: 'gray800', fontSize: 3, fontWeight: '600', mb: 1 }}>Living Song History</Heading>
                <Text sx={{ color: 'gray600', fontSize: 2 }}>
                  Chat comments are tied to each song, so you can relive the disucssion when you get back from a
                  meeting.
                </Text>
              </Box>
            </Box>

            <Box sx={{ flex: [1, '50%', '25%'], px: 2, py: [2, 2, 0] }}>
              <Box
                sx={{
                  bg: 'white',
                  borderRadius: 6,
                  boxShadow: 'md',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  px: 3,
                  py: 4,
                  textAlign: 'left',
                }}
              >
                <Box as={Grid} sx={{ color: 'indigo600', mb: 2 }} />
                <Heading sx={{ color: 'gray800', fontSize: 3, fontWeight: '600', mb: 1 }}>Unlimited Rooms</Heading>
                <Text sx={{ color: 'gray600', fontSize: 2 }}>
                  Create different rooms based on the mood or listening preferences of your team.
                </Text>
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundImage: [
            `url(${WavePurple}), linear-gradient(to bottom, #F7Fafc 10%, #4C51BF 10%)`,
            `url(${WavePurple}), linear-gradient(to bottom, #F7Fafc 20%, #4C51BF 20%)`,
            `url(${WavePurple}), linear-gradient(to bottom, #F7Fafc 25%, #4C51BF 25%)`,
            `url(${WavePurple}), linear-gradient(to bottom, #F7Fafc 40%, #4C51BF 40%)`,
          ],
          backgroundRepeat: 'no-repeat',
          backgroundSize: ['contain', 'contain', 'contain', 'cover'],
          backgroundPosition: 'top',
        }}
      >
        <Container verticalSpace={[4, 5, 6]}>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Heading as="h2" variant="headline" my={[4]} sx={{ color: 'indigo100', textAlign: 'center' }}>
              Plus, a word from our fans.
            </Heading>

            <Flex sx={{ flexDirection: ['column', 'row'] }}>
              <Flex
                as="blockquote"
                sx={{
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  color: 'indigo100',
                  p: 3,
                  mb: [4, 0],
                  flex: [1, '50%'],
                  position: 'relative',
                  '&:before': {
                    backgroundImage: `url(${QuotationMark})`,
                    backgroundRepeat: 'no-repeat',
                    content: '" "',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                  },
                }}
              >
                <Text sx={{ color: 'indigo100', fontSize: [3, 4], lineHeight: 1.5, mb: 4, zIndex: 1 }}>
                  Musicbox has been a great way to maintain and build personal relationships with my colleagues.
                  Building playlists with my team and listening to music together throughout the day has not only
                  introduced me to new music, it has also helped me connect with my teammates in ways I didn&#39;t
                  expect.
                </Text>
                <Box
                  as="cite"
                  sx={{
                    display: 'block',
                    py: 2,
                  }}
                >
                  <Text
                    sx={{
                      display: 'block',
                      color: 'indigo100',
                      fontSize: [3, 4],
                      fontWeight: '600',
                      fontStyle: 'normal',
                    }}
                  >
                    Spencer Bean
                  </Text>
                  <Text
                    sx={{
                      display: 'block',
                      color: 'indigo200',
                      fontSize: [3, 4],
                      fontWeight: '400',
                      fontStyle: 'normal',
                    }}
                  >
                    Operations Manager
                  </Text>
                </Box>
              </Flex>

              <Flex
                as="blockquote"
                sx={{
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  p: 3,
                  mb: [4, 0],
                  flex: [1, '50%'],
                  position: 'relative',
                  '&:before': {
                    backgroundImage: `url(${QuotationMark})`,
                    backgroundRepeat: 'no-repeat',
                    content: '" "',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                  },
                }}
              >
                <Text sx={{ color: 'indigo100', fontSize: [3, 4], mb: 4, lineHeight: 1.5, zIndex: 1 }}>
                  Musicbox makes work more fun. When my friends and I are using Musicbox, we get to learn about each
                  other, learn about new songs we like (or hate), and keep focused on getting the job done...together.
                </Text>
                <Box
                  as="cite"
                  sx={{
                    display: 'block',
                    py: 2,
                  }}
                >
                  <Text
                    sx={{
                      display: 'block',
                      color: 'indigo100',
                      fontSize: [3, 4],
                      fontWeight: '600',
                      fontStyle: 'normal',
                    }}
                  >
                    Jason Sisk
                  </Text>
                  <Text
                    sx={{
                      display: 'block',
                      color: 'indigo200',
                      fontSize: [3, 4],
                      fontWeight: '400',
                      fontStyle: 'normal',
                    }}
                  >
                    Engineering Manager
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Container>
      </Box>

      {/* <Box
        sx={{
          backgroundImage: 'linear-gradient(to bottom, rgba(102, 126, 234, 75%) 50%, #1A202C 50%)'
        }}
      >
        <Container>
          <Box sx={{bg: 'indigo100', borderRadius: 6, color: 'indigo800', p: 4,}}>
            We've been at this a while.
          </Box>
        </Container>
      </Box> */}

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
