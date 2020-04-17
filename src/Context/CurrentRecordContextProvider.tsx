import React, { createContext, useContext, useEffect, useState } from 'react'

import { useWebsocketContext } from './WebsocketContextProvider'

export type CurrentRecord = {
  id: string
  playedAt: string
  song: {
    id: string
    name: string
    youtubeId: string
  }
  user: {
    id: string
    name: string
    email: string
  }
} | null

type CurrentRecordContext = {
  currentRecord: CurrentRecord
  setCurrentRecord: (currentRecord: CurrentRecord) => void
}

const CurrentRecordContext = createContext<Partial<CurrentRecordContext>>({})
export const CurrentRecordContextProvider: React.FC = ({ children }) => {
  const [currentRecord, setCurrentRecord] = useState<CurrentRecord>(null)
  const websocket = useWebsocketContext()

  useEffect(() => {
    return websocket.subscribeToNowPlaying(nowPlaying => {
      setCurrentRecord(nowPlaying.currentRecord)
    })
  }, [setCurrentRecord, websocket])

  return (
    <CurrentRecordContext.Provider value={{ currentRecord, setCurrentRecord }}>
      {children}
    </CurrentRecordContext.Provider>
  )
}

export const useCurrentRecordContext: () => CurrentRecordContext = () => {
  const { currentRecord, setCurrentRecord } = useContext(CurrentRecordContext)

  if (currentRecord === undefined || setCurrentRecord === undefined) {
    throw new Error('CurrentRecordContext accessed before being set')
  }

  return { currentRecord, setCurrentRecord }
}
