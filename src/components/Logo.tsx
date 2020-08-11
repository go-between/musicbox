import React from 'react'
import { Image } from 'rebass'

export const Logo: React.FC<{ imageSrc: string; width?: string }> = ({ imageSrc, width }) => (
  <Image
    src={imageSrc}
    sx={{
      p: 1,
      width: width || '125px',
    }}
  />
)
