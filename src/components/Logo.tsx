import React from 'react'
import { Image } from 'rebass'

export const Logo: React.FC = ({ path }) => (
  <Image
    src={path}
    sx={{
      width: [ '100%', '50%' ],
    }}
  />
)
