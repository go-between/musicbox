import React, { createContext, useContext, useState } from 'react'

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
}

const VolumeContext = createContext<Partial<VolumeContext>>({})
export const VolumeContextProvider: React.FC = ({ children }) => {
  const [unmutedPlayer, setUnmutedPlayer] = useState<keyof PlayerTypes>(PLAYERS.main)
  const [volume, setInnerVolume] = useState<number>(retrieveVolume())

  const setVolume = (volume: number): void => {
    persistVolume(volume)
    setInnerVolume(volume)
  }

  return (
    <VolumeContext.Provider value={{ setUnmutedPlayer, setVolume, unmutedPlayer, volume }}>
      {children}
    </VolumeContext.Provider>
  )
}

export const useVolumeContext: () => VolumeContext = () => {
  const { setUnmutedPlayer, setVolume, unmutedPlayer, volume } = useContext(VolumeContext)

  if (
    setUnmutedPlayer === undefined ||
    setVolume === undefined ||
    unmutedPlayer === undefined ||
    volume === undefined
  ) {
    throw new Error('VolumeContext accessed before being set')
  }

  return { setUnmutedPlayer, setVolume, unmutedPlayer, volume }
}
