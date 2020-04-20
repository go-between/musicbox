import React, { MutableRefObject, createContext, useContext, useState } from 'react'

type VideoContext = {
  videoRef: MutableRefObject<Element | undefined> | null
  setVideoRef: (ref: MutableRefObject<Element | undefined> | null) => void
}
const VideoContext = createContext<Partial<VideoContext>>({})

export const VideoContextProvider: React.FC = ({ children }) => {
  const [videoRef, setVideoRef] = useState<VideoContext['videoRef']>(null)

  return <VideoContext.Provider value={{ videoRef, setVideoRef }}>{children}</VideoContext.Provider>
}

export const useVideoContext = (): VideoContext => {
  const { setVideoRef, videoRef } = useContext(VideoContext)

  if (videoRef === undefined || setVideoRef === undefined) {
    throw new Error('VideoContext has been accessed outside of its provider')
  }

  return {
    setVideoRef,
    videoRef,
  }
}
