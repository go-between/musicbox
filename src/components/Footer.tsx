import React from 'react'
// import { useHistory } from 'react-router-dom'
import { Box, Flex, Image, Text } from 'rebass'

import { Container } from '.'
import LogoDarkMode from 'images/musicbox-mark.svg'

export const Footer: React.FC = () => {
  // const history = useHistory()
  // const navigate = (to: string) => (ev: React.MouseEvent) => {
  //   ev.preventDefault()
  //   history.push(to)
  // }

  return (
    <Box as="footer" bg="background" color="gray100">
      <Container verticalSpace={[4, 5]}>
        <Flex
          alignItems="space-between"
          flexDirection={['column', 'row']}
          sx={{ borderBottom: '2px solid', borderColor: 'gray800', pb: 4, mb: 4 }}
        >
          <Box width={['100%', '50%']}>
            <Box width="50px">
              <Image src={LogoDarkMode} />
            </Box>

            <Text>
              Hi, we&#39;re Musicbox, a fun and collaborative way for remote teams to enjoy music together without
              needing to be in the same room. Think of it as a dedicated place to listen, discuss, and share music with
              the folks on your team.
            </Text>
          </Box>
        </Flex>
        <Flex>
          <Text>Copyright</Text>
          <Text>hello@musicbox.fm</Text>
        </Flex>
      </Container>
    </Box>
  )
}
