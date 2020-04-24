import React, { useState } from 'react'
import { Box, Flex } from 'rebass'
import { Volume as MutedVolume, Volume1, Volume2 } from 'react-feather'
import { Slider } from '@rebass/forms'

import { useVolumeContext, PLAYERS } from './VolumeContextProvider'

const Volume: React.FC = () => {
  const { setUnmutedPlayer, setVolume, volume } = useVolumeContext()
  const VolumeIcon = volume === 0 ? MutedVolume : volume < 50 ? Volume1 : Volume2
  const [storedVolume, setStoredVolume] = useState<number | null>(null)

  const toggleMute = (): void => {
    if (storedVolume === null) {
      setStoredVolume(volume)
      setVolume(0)
    } else {
      setVolume(storedVolume)
      setStoredVolume(null)
    }
  }

  const changeVolume = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    const volume = parseInt(ev.currentTarget.value, 10)
    setVolume(volume)
    setStoredVolume(null)
    setUnmutedPlayer(PLAYERS.main)
  }

  return (
    <Flex sx={{ cursor: 'pointer', position: 'relative', '&:hover > *': { visibility: 'visible' } }}>
      <Box
        sx={{
          bg: 'background',
          position: 'absolute',
          left: '-180%',
          bottom: '180%',
          p: 2,
          width: '100px',
          transform: 'rotate(270deg)',
          visibility: 'hidden',
        }}
      >
        <Slider onChange={changeVolume} value={volume} width="100%" />
      </Box>
      <Box onClick={toggleMute} sx={{ zIndex: 100 }}>
        <VolumeIcon />
      </Box>
    </Flex>
  )
}
export default Volume
