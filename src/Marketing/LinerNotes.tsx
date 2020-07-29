import React from 'react'
import { Box, Heading, Image, Text } from 'rebass'

import { Container, Header, Footer } from 'components'
import Signatures from 'images/dan-truman.svg'

const LinerNotes: React.FC = () => {
  return (
    <Box
      sx={{
        bg: 'white',
        color: 'modes.light.text',
      }}
    >
      <Header />

      <Container verticalSpace={6} gutterSpace={4}>
        <Box
          sx={{
            textAlign: ['left', 'center'],
          }}
        >
          <Heading as="h2" variant="headline" sx={{ mb: 3 }}>
            Music is better together
          </Heading>
          <Text as="p" variant="intro">
            Hi, we're Musicbox, a fun and collaborative way for remote teams to enjoy music together without needing to
            be in the same room. Think of it as a dedicated place to listen, discuss, and share music with the folks on
            your team.
          </Text>
        </Box>
      </Container>

      <Box
        sx={{
          maxWidth: 700,
          mx: 'auto',
          px: [4],
        }}
      >
        <Box mb={3}>
          <Heading as="h2" variant="subHeadline">
            We want to love remote work
          </Heading>
        </Box>

        <Text as="p" variant="body">
          Remote work has a ton of great benefits. It gives us the freedom to work from most any desk, couch, or kitchen
          table. It let’s us trade long commutes for important things like exercise, sleep, and time with friends and
          family. And asynchronous communication means fewer shoulder-tapping interruptions and more time to focus on
          deep, meaningful work. In short, working on a remote team has made us feel happier, healthier, and more
          productive.
        </Text>

        <Text as="p" variant="body">
          But remote isn’t perfect. We struggle to find balance in our day, and it’s easy to feel isolated and lonely.
          There’s a more personal side of remote work that isn’t being considered -- there’s a gap in the remote
          toolchain. We might point out that gap as some mishmash of in-person connection; like taking a coffee break,
          or catching up with co-workers before a meeting. This is part of it, but it’s more than that. We’re lacking
          tools that help us connect with our co-workers in fun and informal ways, which is an admittedly awkward and
          difficult problem to solve when you’re on a remote team.
        </Text>

        <Text as="p" variant="body">
          Musicbox helps teams build stronger connections with each other by creating a shared environment for them to
          listen, share, and discuss music together. This environment, and the conversations that stem from it, offer a
          remote-friendly way to discover the -- not the Slack avatars -- that you work with.
        </Text>

        <Box mb={3}>
          <Heading as="h2" variant="subHeadline">
            Why personal connections matter
          </Heading>
        </Box>

        <Text as="p" variant="body">
          A good team is more than its output. We work to support each other, and we do that by knowing our collective
          strengths and weaknesses, our quirks and preferences. We know when someone is feeling down and how to pick
          them back up. This connection is the strength of our team. It doesn’t develop overnight.
        </Text>

        <Text as="p" variant="body">
          In a physical office, connection is built incidentally -- either by sharing a story with a fellow team member
          as you walk to a meeting or a recapping the weekend as you heat up your lunch in the cafeteria. This almost
          accidental, happenstance form of connection is an automatic strength of the physical office, and it’s a
          surprisingly good way to feel connected to people on your team. Unfortunately, we don’t have this luxury when
          we’re remote. Connection doesn’t happen by accident, it must be intentional.
        </Text>

        <Text as="p" variant="body">
          Informal connection is hard when you’re remote, but we’re willing to give it a try. That’s why we’re building
          Musicbox, a digital place for folks to bond over their shared love music. In Musicbox it’s a song that sparks
          a memory about “that one time, listening to this album back in school”, or “when I was out on a walk last
          night I saw the coolest poster for this band.” It’s finding a great song to recommend to a co-worker based on
          something they said last week. We’re building Musicbox to help us share parts of ourselves with our coworkers.
        </Text>

        <Box mb={3}>
          <Heading as="h2" variant="subHeadline">
            You can’t copy &amp; paste a physical office
          </Heading>
        </Box>

        <Text as="p" variant="body">
          We need tools that acknowledge the unique realities of what it means to be on a remote team. Tools that
          provide creative ways to connect, and that allow conversation to flow organically. Tools that are built around
          common experience and shared interests -- and most importantly, tools that bring a bit of fun to our digital
          office.
        </Text>

        <Text as="p" variant="body">
          What we have today doesn’t work. It’s the well-intentioned, but unbearably awkward Zoom happy hours, the
          hundreds of disjointed “#food,” “#cat-pictures,” and “#off-topic” Slack channels. It’s so, so many shared
          memes. Trying to recreate the physical world in a digital environment is the wrong approach.
        </Text>

        <Text as="p" variant="body">
          We think it’s time to explore the human side of remote work. This is why we’re building Musicbox. We love
          music. It’s a familiar and personal part of our workday -- whether we’re writing code or finally getting
          through a stack of unread emails, we find comfort and company in the perfect song. Musicbox helps us share
          those moments while we listen together like we’re clustered together around the same office radio. And
          Musicbox helps us share whatever else comes up along the way. We know that technology does not automatically
          solve nuanced human problems, but we think music is a common and familiar thread that can help us feel a
          little closer, a little less lonely, and a lot more connected.
        </Text>

        <Box
          sx={{
            bg: 'indigo100',
            borderRadius: [0, 6],
            py: 4,
            px: 4,
            mx: -4,
            // transform: [0, 'rotate(1deg)']
          }}
        >
          <Text as="p" variant="body" sx={{ color: 'indigo600', fontSize: 3, lineHeight: 1.5, mb: 3 }}>
            So, if you work on a remote team, if you love music, if any part of our notes have resonated with you, we’d
            love to talk. Please send us an email at{' '}
            <Box as="a" href="mailto:hello@musicbox.fm" sx={{ color: 'indigo600', fontWeight: 600 }}>
              hello@musicbox.fm
            </Box>{' '}
            and we'll get you jamming in no time.
          </Text>
        </Box>

        <Box py={4}>
          <Text as="p" variant="body">
            See you soon!
          </Text>
          {/* <Text>&mdash; Dan &amp; Truman</Text> */}
          <Image src={Signatures} />
        </Box>
      </Box>

      <Footer />
    </Box>
  )
}

export default LinerNotes
