import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
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
  const setRefFromPlayer = (player: ReactPlayer): void => setPlayer(player)
  const { unmutedPlayer, volume } = useVolumeContext()
  const { videoRef } = useVideoContext()
  const { showVideo, setProgress } = usePlayerContext()

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

  const Player = (
    <ReactPlayer
      ref={setRefFromPlayer}
      controls={controls}
      url={`https://www.youtube.com/watch?v=${youtubeId}&nonce=${playedAt}`}
      playing={true}
      progressInterval={500}
      volume={unmutedPlayer === playerIdentifier ? (volume || 0) / 100.0 : 0}
      height="350px"
      width="100%"
      style={{ border: '1px solid #2D3748' }}
      onProgress={setProgress}
    />
  )

  if (inline) {
    return Player
  }

  if (!showVideo) {
    return <Box sx={{ visibility: 'hidden', height: 0 }}>{Player}</Box>
  }

  if (!!videoRef && !!videoRef.current) {
    return createPortal(Player, videoRef.current)
  }

  return <Box sx={{ visibility: 'hidden', height: 0 }}>{Player}</Box>
}

export default PlayerPrimitive
