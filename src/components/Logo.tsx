import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box as MusicBox } from 'react-feather'
import { Box, Heading, Link } from 'rebass'

const Logo: React.FC = () => {
  const history = useHistory()
  const navigate = (to: string) => (ev: React.MouseEvent) => {
    ev.preventDefault()
    history.push(to)
  }
  return (
    <Link
      onClick={navigate('/')}
    >
      <Heading
        as='h1'
        sx={{
          alignItems: 'center',
          color: 'modes.light.text',
          display: 'flex',
          fontWeight: 800,
          fontSize: 4,
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            bg: 'primary',
            borderRadius: 4,
            color: 'indigo100',
            display: 'flex',
            mr: 2,
            p: 1,
          }}
        >
          <MusicBox />
        </Box>
        Musicbox
      </Heading>
    </Link>
  )
}

export default Logo
