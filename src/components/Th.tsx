import React from 'react'
import { Box } from 'rebass'

type Props = {
  width?: string | Array<string>
}

export const Th: React.FC<Props> = ({ children, width = 'auto' }) => (
  <Box
    as="th"
    sx={{
      p: 3,
      textAlign: 'left',
      fontSize: 1,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      width: width,
    }}
  >
    {children}
  </Box>
)
