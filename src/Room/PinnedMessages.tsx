import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { Box } from 'rebass'

import { useCurrentRecordContext } from 'Room'

import { PINNED_MESSAGES_QUERY, PinnedMessagesQuery } from './graphql'
import Message from './Message'

const PinnedMessages: React.FC = () => {
  const [loadPinnedMessages, { data }] = useLazyQuery<PinnedMessagesQuery['data'], PinnedMessagesQuery['vars']>(
    PINNED_MESSAGES_QUERY,
    { fetchPolicy: 'network-only' },
  )

  const { currentRecord } = useCurrentRecordContext()

  useEffect(() => {
    if (!currentRecord) {
      return
    }

    loadPinnedMessages({ variables: { songId: currentRecord.song.id } })
  }, [currentRecord, loadPinnedMessages])

  if (currentRecord === null || !data) {
    return <></>
  }

  return (
    <Box
      id="pinned-messages"
      sx={{
        overflowY: 'scroll',
      }}
    >
      {data.pinnedMessages.map(m => (
        <Message key={m.id} message={m} />
      ))}
    </Box>
  )
}

export default PinnedMessages
