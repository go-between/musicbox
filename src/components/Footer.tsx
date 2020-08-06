import React from 'react'
// import { useHistory } from 'react-router-dom'
import { Box, Flex, Image, Text } from 'rebass'
import moment from 'moment'
import { GitHub, Mail } from 'react-feather'

import { Container } from '.'
import LogoDarkMode from 'images/musicbox-mark.svg'

export const Footer: React.FC = () => {
  // const history = useHistory()
  // const navigate = (to: string) => (ev: React.MouseEvent) => {
  //   ev.preventDefault()
  //   history.push(to)
  // }
var foo = moment().format("YYYY")

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

            <Text sx={{color: 'gray500', fontSize: 3}}>
              Hi, we&#39;re Musicbox, a fun and collaborative way for remote teams to enjoy music together without
              needing to be in the same room. Think of it as a dedicated place to listen, discuss, and share music with
              the folks on your team.
            </Text>
          </Box>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <Box>
            <Text sx={{color: 'gray500'}}>&copy;Copyright {foo}</Text>
          </Box>

          <Box>
            <Box as="a" variant="footerLink" href="https://github.com/go-between">
              <GitHub />
            </Box>

            <Box as="a" variant="footerLink" href="mailto: hello@musicbox.fm">
              <Mail />
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
