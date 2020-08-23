import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import moment from 'moment'

import { useVolumeContext, PlayerTypes } from './VolumeContextProvider'

type Props = {
  controls?: boolean
  playedAt?: string
  pip?: boolean
  youtubeId: string | undefined
  playerIdentifier: keyof PlayerTypes
}

const PlayerPrimitive: React.FC<Props> = ({ controls, playedAt, pip = false, youtubeId, playerIdentifier }) => {
  const [player, setPlayer] = useState<ReactPlayer>()
  const { unmutedPlayer, volume } = useVolumeContext()

  useEffect(() => {
    if (!player || !playedAt) {
      return
    }
    const start = Math.floor(moment.duration(moment().diff(playedAt)).as('seconds'))
    if (start <= 1) {
      return
    }

    player.seekTo(start, 'seconds')
  }, [player, playedAt])

  return (
    <ReactPlayer
      onReady={setPlayer}
      controls={controls}
      url={`https://www.youtube.com/watch?v=${youtubeId}&nonce=${playedAt}`}
      playing={true}
      volume={unmutedPlayer === playerIdentifier ? (volume || 0) / 100.0 : 0}
      height="300px"
      width="100%"
      pip={pip}
    />
  )
}

export default PlayerPrimitive
