import React from 'react'
import { Box, Button } from 'rebass'

import { useJumpMenuContext } from 'JumpMenu'

const JumpMenuEntry: React.FC = () => {
  const { show } = useJumpMenuContext()
  return (
    <Box>
      <Button onClick={show}>Open Jump Menu (j)</Button>
    </Box>
  )
}

export default JumpMenuEntry
