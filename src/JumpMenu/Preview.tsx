import React, { useEffect } from 'react'

import PlayerPrimitive from 'Player/PlayerPrimitive'
import { useVolumeContext, PLAYERS } from 'Player/VolumeContextProvider'

import { useInputContext } from './InputContextProvider'

const Preview: React.FC = () => {
  const { youtubePreviewId } = useInputContext()
  const { setUnmutedPlayer } = useVolumeContext()

  useEffect(() => {
    setUnmutedPlayer(PLAYERS.preview)
    return () => setUnmutedPlayer(PLAYERS.main)
  })

  return (
    <PlayerPrimitive
      playedAt=""
      youtubeId={youtubePreviewId}
      controls={true}
      playerIdentifier={PLAYERS.preview}
      inline={true}
    />
  )
}

export default Preview
