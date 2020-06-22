import React from 'react'
import { Image } from 'rebass'
import MusicboxLogo from 'images/musicbox-logo.svg'

export const Logo: React.FC = () => (
  <Image
    src={MusicboxLogo}
    sx={{
      width: '125px',
    }}
  />
)
