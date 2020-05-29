import React, { createContext, useCallback, useContext, useState } from 'react'

import { retrieveVolume, persistVolume } from 'lib/localStore'

export type PlayerTypes = {
  main: 'main'
  preview: 'preview'
}
export const PLAYERS: PlayerTypes = {
  main: 'main',
  preview: 'preview',
}

type VolumeContext = {
  unmutedPlayer: keyof PlayerTypes
  setUnmutedPlayer: (player: keyof PlayerTypes) => void
  volume: number
  setVolume: (idx: number) => void
  toggleMute: () => void
}

const VolumeContext = createContext<Partial<VolumeContext>>({})
export const VolumeContextProvider: React.FC = ({ children }) => {
  const [unmutedPlayer, setUnmutedPlayer] = useState<keyof PlayerTypes>(PLAYERS.main)
  const [volume, setInnerVolume] = useState<number>(retrieveVolume())
  const [storedVolume, setStoredVolume] = useState(0)

  const setVolume = useCallback(
    (volume: number) => {
      persistVolume(volume)
      setInnerVolume(volume)
    },
    [setInnerVolume],
  )

  const toggleMute = useCallback(() => {
    if (volume === 0) {
      setVolume(storedVolume)
    } else {
      setStoredVolume(volume)
      setVolume(0)
    }
  }, [volume, setStoredVolume, setVolume, storedVolume])

  return (
    <VolumeContext.Provider value={{ setUnmutedPlayer, setVolume, toggleMute, unmutedPlayer, volume }}>
      {children}
    </VolumeContext.Provider>
  )
}

export const useVolumeContext: () => VolumeContext = () => {
  const { setUnmutedPlayer, setVolume, toggleMute, unmutedPlayer, volume } = useContext(VolumeContext)

  if (
    setUnmutedPlayer === undefined ||
    setVolume === undefined ||
    toggleMute === undefined ||
    unmutedPlayer === undefined ||
    volume === undefined
  ) {
    throw new Error('VolumeContext accessed before being set')
  }

  return { setUnmutedPlayer, setVolume, toggleMute, unmutedPlayer, volume }
}
