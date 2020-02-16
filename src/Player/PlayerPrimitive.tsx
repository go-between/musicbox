import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import moment from 'moment'

type Props = {
  changeProgress: (opts: { played: number }) => void
  playedAt: string
  youtubeId: string
  volume: number
}

const PlayerPrimitive: React.FC<Props> = ({ changeProgress, playedAt, youtubeId, volume }) => {
  const [player, setPlayer] = useState<ReactPlayer>()
  const setRefFromPlayer = (player: ReactPlayer): void => setPlayer(player)

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
      url={`https://www.youtube.com/watch?v=${youtubeId}&nonce=${playedAt}`}
      playing={true}
      volume={volume}
      height="100%"
      width="100%"
      style={{ pointerEvents: 'none' }}
      onProgress={changeProgress}
    />
  )
}

export default PlayerPrimitive