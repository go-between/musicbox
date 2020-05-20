import React, { createContext, useContext, useState } from 'react'

import { persistShowVideo, retrieveShowVideo } from 'lib/localStore'

type PlayerContext = {
  showVideo: boolean
  toggleShowVideo: () => void
}

const PlayerContext = createContext<Partial<PlayerContext>>({})
export const PlayerContextProvider: React.FC = ({ children }) => {
  const [showVideo, setInnerShowVideo] = useState(retrieveShowVideo())

  const toggleShowVideo = (): void => {
    persistShowVideo(!showVideo)
    setInnerShowVideo(!showVideo)
  }

  return <PlayerContext.Provider value={{ showVideo, toggleShowVideo }}>{children}</PlayerContext.Provider>
}

export const usePlayerContext: () => PlayerContext = () => {
  const { showVideo, toggleShowVideo } = useContext(PlayerContext)

  if (showVideo === undefined || toggleShowVideo === undefined) {
    throw new Error('PlayerContext accessed before being set')
  }

  return { showVideo, toggleShowVideo }
}
