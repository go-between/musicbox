import React from 'react'
import { Box, Button } from 'rebass'

import { useJumpNavigationContext } from 'JumpMenu'

const JumpMenuEntry: React.FC = () => {
  const { show } = useJumpNavigationContext()
  return (
    <Box>
      <Button onClick={show}>Open Jump Menu (j)</Button>
    </Box>
  )
}

export default JumpMenuEntry
