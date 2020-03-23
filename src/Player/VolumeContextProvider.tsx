import React, { createContext, useContext, useState } from 'react'

import { retrieveVolume } from 'lib/localStore'

export const PLAYERS = {
  main: 'main',
  preview: 'preview',
}

type VolumeContext = {
  unmutedPlayer: string
  setUnmutedPlayer: (player: string) => void
  volume: number | null
  setVolume: (idx: number | null) => void
}

const VolumeContext = createContext<Partial<VolumeContext>>({})
const VolumeContextProvider: React.FC = ({ children }) => {
  const [unmutedPlayer, setUnmutedPlayer] = useState<string>(PLAYERS.main)
  const [volume, setVolume] = useState<number | null>(retrieveVolume())

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
export default VolumeContextProvider
