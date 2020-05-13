import React, { createContext, useContext, useState } from 'react'

import { persistShowVideo, retrieveShowVideo } from 'lib/localStore'

type PlayerContext = {
  progress: number
  playedSeconds: number
  setProgress: (opts: { played: number; playedSeconds: number }) => void
  showVideo: boolean
  toggleShowVideo: () => void
}

const PlayerContext = createContext<Partial<PlayerContext>>({})
export const PlayerContextProvider: React.FC = ({ children }) => {
  const [showVideo, setInnerShowVideo] = useState(retrieveShowVideo())
  const [progress, setInnerProgress] = useState(0)
  const [playedSeconds, setPlayedSeconds] = useState(0)

  const setProgress = (opts: { played: number; playedSeconds: number }): void => {
    setInnerProgress(opts.played * 100)
    setPlayedSeconds(opts.playedSeconds)
  }
  const toggleShowVideo = (): void => {
    persistShowVideo(!showVideo)
    setInnerShowVideo(!showVideo)
  }

  return (
    <PlayerContext.Provider value={{ progress, playedSeconds, setProgress, showVideo, toggleShowVideo }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayerContext: () => PlayerContext = () => {
  const { progress, playedSeconds, setProgress, showVideo, toggleShowVideo } = useContext(PlayerContext)

  if (
    progress === undefined ||
    playedSeconds === undefined ||
    setProgress === undefined ||
    showVideo === undefined ||
    toggleShowVideo === undefined
  ) {
    throw new Error('PlayerContext accessed before being set')
  }

  return { progress, playedSeconds, setProgress, showVideo, toggleShowVideo }
}
