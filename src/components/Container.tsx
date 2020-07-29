import React from 'react'
import { Box } from 'rebass'

export const Container: React.FC<{ width?: string; verticalSpace?: {}; gutterSpace?: {} }> = ({
  children,
  gutterSpace,
  verticalSpace,
  width,
}) => (
  <Box
    sx={{
      maxWidth: width || '1024px',
      mx: 'auto',
      px: gutterSpace || [3, 4],
      py: verticalSpace || 'auto',
    }}
  >
    {children}
  </Box>
)
