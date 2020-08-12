import React from 'react'
import { Box, Flex } from 'rebass'
import { VolumeX as MutedVolume, Volume1, Volume2 } from 'react-feather'
import { Slider } from '@rebass/forms'

import { useVolumeContext, PLAYERS } from './VolumeContextProvider'

const Volume: React.FC = () => {
  const { setUnmutedPlayer, setVolume, toggleMute, volume } = useVolumeContext()
  const VolumeIcon = volume === 0 ? MutedVolume : volume < 50 ? Volume1 : Volume2

  const changeVolume = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    const volume = parseInt(ev.currentTarget.value, 10)
    setVolume(volume)
    setUnmutedPlayer(PLAYERS.main)
  }

  return (
    <Flex sx={{ cursor: 'pointer', position: 'relative', '&:hover > *': { visibility: 'visible' } }}>
      <Box
        sx={{
          bg: 'black',
          borderRadius: 6,
          boxShadow: 'md',
          position: 'absolute',
          left: '-90%',
          bottom: '70px',
          p: 2,
          width: '100px',
          transform: 'rotate(270deg)',
          visibility: 'hidden',
        }}
      >
        <Slider onChange={changeVolume} value={volume} width="100%" />
      </Box>

      <Box
        onClick={toggleMute}
        sx={{
          alignItems: 'center',
          bg: volume === 0 ? 'primaryHover' : 'background',
          borderRadius: 6,
          color: volume === 0 ? 'primary' : 'muted',
          display: 'flex',
          p: 2,
          zIndex: 100,
          '&:hover': {
            bg: 'primaryHover',
            color: 'primary',
          }
        }}
      >
        <VolumeIcon size={20} />
      </Box>
    </Flex>
  )
}
export default Volume
