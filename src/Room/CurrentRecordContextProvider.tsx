import React, { createContext, useState } from 'react'

import { Room as RoomType } from './graphql'

type CurrentRecordContext = {
  currentRecord: RoomType['currentRecord']
  setCurrentRecord: (currentRecord: RoomType['currentRecord']) => void
}
export const CurrentRecordContext = createContext<CurrentRecordContext>({
  currentRecord: null,
  setCurrentRecord: currentRecord => {
    console.log('setCurrentRecord must be redefined', currentRecord)
  },
})

const CurrentRecordContextProvider: React.FC = ({ children }) => {
  const [currentRecord, setCurrentRecord] = useState<RoomType['currentRecord']>(null)

  return (
    <CurrentRecordContext.Provider value={{ currentRecord, setCurrentRecord }}>
      {children}
    </CurrentRecordContext.Provider>
  )
}
export default CurrentRecordContextProvider
