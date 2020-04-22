import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'

import { useCurrentRecordContext, useWebsocketContext } from 'Context'

import { Message, PinnedMessagesQuery, PINNED_MESSAGES_QUERY } from './graphql'

type PinnedMessagesContext = {
  pinnedMessages: Message[]
}

const PinnedMessagesContext = createContext<Partial<PinnedMessagesContext>>({})
const PinnedMessagesContextProvider: React.FC = ({ children }) => {
  const [pinnedMessages, setPinnedMessages] = useState<Message[]>([])
  const [loadPinnedMessages] = useLazyQuery<PinnedMessagesQuery['data'], PinnedMessagesQuery['vars']>(
    PINNED_MESSAGES_QUERY,
    { fetchPolicy: 'network-only', onCompleted: data => setPinnedMessages(data.pinnedMessages) },
  )

  const { currentRecord } = useCurrentRecordContext()
  useEffect(() => {
    if (!currentRecord) {
      setPinnedMessages([])
      return
    }

    loadPinnedMessages({ variables: { songId: currentRecord.song.id } })
  }, [currentRecord, loadPinnedMessages])

  const websocket = useWebsocketContext()

  useEffect(() => {
    return websocket.subscribeToPinnedMessages(messages => {
      setPinnedMessages(messages)
    })
  }, [websocket])

  return <PinnedMessagesContext.Provider value={{ pinnedMessages }}>{children}</PinnedMessagesContext.Provider>
}

export const usePinnedMessagesContext: () => PinnedMessagesContext = () => {
  const { pinnedMessages } = useContext(PinnedMessagesContext)

  if (pinnedMessages === undefined) {
    throw new Error('PinnedMessagesContext accessed before being set')
  }

  return { pinnedMessages }
}
export default PinnedMessagesContextProvider
