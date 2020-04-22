import React from 'react'
import { Box } from 'rebass'

import { usePinnedMessagesContext } from './PinnedMessagesContextProvider'
import Message from './Message'

const PinnedMessages: React.FC = () => {
  const { pinnedMessages } = usePinnedMessagesContext()

  return (
    <Box
      id="pinned-messages"
      sx={{
        overflowY: 'scroll',
      }}
    >
      {pinnedMessages.map(m => (
        <Message key={m.id} message={m} />
      ))}
    </Box>
  )
}

export default PinnedMessages
