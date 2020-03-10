import React, { createContext, useContext, useState } from 'react'

import { Room as RoomType } from './graphql'

type CurrentRecordContext = {
  currentRecord: RoomType['currentRecord']
  setCurrentRecord: (currentRecord: RoomType['currentRecord']) => void
}

const CurrentRecordContext = createContext<Partial<CurrentRecordContext>>({})
const CurrentRecordContextProvider: React.FC = ({ children }) => {
  const [currentRecord, setCurrentRecord] = useState<RoomType['currentRecord']>(null)

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
export default CurrentRecordContextProvider
