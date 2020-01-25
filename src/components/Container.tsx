import React from 'react'
import { Box } from 'rebass'

const Container = (props: any) => (
  <Box
    {...props}
    sx={{
      maxWidth: '1024px',
      mx: 'auto',
      px: 3,
    }}
  />
)

export default Container
