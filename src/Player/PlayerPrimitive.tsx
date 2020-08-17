import React, { useState, useEffect } from 'react'
import { Box } from 'rebass'
import ReactPlayer from 'react-player'
import moment from 'moment'

import { useVideoContext } from 'Context'

import { usePlayerContext } from './PlayerContextProvider'
import { useVolumeContext, PlayerTypes } from './VolumeContextProvider'

type Props = {
  controls?: boolean
  playedAt: string
  youtubeId: string | undefined
  playerIdentifier: keyof PlayerTypes
  inline?: boolean
}

const PlayerPrimitive: React.FC<Props> = ({ controls, inline = false, playedAt, youtubeId, playerIdentifier }) => {
  const [player, setPlayer] = useState<ReactPlayer>()
  const [dimensions, setDimensions] = useState({ top: 0, right: 0, bottom: 0, left: 0 })
  const setRefFromPlayer = (player: ReactPlayer): void => setPlayer(player)
  const { unmutedPlayer, volume } = useVolumeContext()
  const { videoRef } = useVideoContext()
  const { showVideo } = usePlayerContext()

  useEffect(() => {
    if (!player) {
      return
    }
    const start = Math.floor(moment.duration(moment().diff(playedAt)).as('seconds'))
    if (start <= 1) {
      return
    }

    player.seekTo(start, 'seconds')
  }, [player, playedAt])

  useEffect(() => {
    const setVideoDimensions = (ref: Element | undefined): void => {
      if (!ref || inline) {
        return
      }

      const { top, bottom, left, width } = ref.getBoundingClientRect()
      const right = window.innerWidth - left - width
      setDimensions({ top, right, bottom, left })
    }

    setVideoDimensions(videoRef?.current)
    const onResize = (): void => setVideoDimensions(videoRef?.current)
    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [videoRef, inline])

  const position = inline || !videoRef ? 'inherit' : 'absolute'
  const height = inline || (showVideo && videoRef) ? '350px' : '0'
  const visibility = inline || (showVideo && videoRef) ? 'visible' : 'hidden'
  const { top, right, bottom, left } = dimensions

  return (
    <Box
      sx={{
        position,
        top,
        right,
        bottom,
        left,
        height,
        visibility,
        borderRadius: 6,
        overflow: 'hidden',
      }}
    >
      <ReactPlayer
        ref={setRefFromPlayer}
        controls={controls}
        url={`https://www.youtube.com/watch?v=${youtubeId}&nonce=${playedAt}`}
        playing={true}
        volume={unmutedPlayer === playerIdentifier ? (volume || 0) / 100.0 : 0}
        height="300px"
        width="100%"
        // style={{ }}
      />
    </Box>
  )
}

export default PlayerPrimitive
