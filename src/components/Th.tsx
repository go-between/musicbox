import React from 'react'
import { Box } from 'rebass'

type Props = {
  width?: string | Array<string>
}

export const Th: React.FC<Props> = ({ children, width = 'auto' }) => (
  <Box
    as="th"
    sx={{
      color: 'gray400',
      fontSize: 1,
      p: 3,
      textAlign: 'left',
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      width: width,
    }}
  >
    {children}
  </Box>
)
