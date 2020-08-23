import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import moment from 'moment'

import { useVolumeContext, PlayerTypes } from './VolumeContextProvider'

type Props = {
  controls?: boolean
  playedAt: string
  youtubeId: string | undefined
  playerIdentifier: keyof PlayerTypes
}

const PlayerPrimitive: React.FC<Props> = ({ controls, playedAt, youtubeId, playerIdentifier }) => {
  const [player, setPlayer] = useState<ReactPlayer>()
  const setRefFromPlayer = (player: ReactPlayer): void => setPlayer(player)
  const { unmutedPlayer, volume } = useVolumeContext()

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

  return (
    <ReactPlayer
      ref={setRefFromPlayer}
      controls={controls}
      url={`https://www.youtube.com/watch?v=${youtubeId}&nonce=${playedAt}`}
      playing={true}
      volume={unmutedPlayer === playerIdentifier ? (volume || 0) / 100.0 : 0}
      height="300px"
      width="100%"
    />
  )
}

export default PlayerPrimitive
