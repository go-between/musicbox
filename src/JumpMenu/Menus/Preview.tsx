import React, { useEffect } from 'react'
import { Heading } from 'rebass'

import PlayerPrimitive from 'Player/PlayerPrimitive'
import { useVolumeContext, PLAYERS } from 'Player/VolumeContextProvider'

import { useInputContext } from '../InputContextProvider'

const Preview: React.FC = () => {
  const { youtubePreviewId } = useInputContext()
  const { setUnmutedPlayer } = useVolumeContext()

  useEffect(() => {
    setUnmutedPlayer(PLAYERS.preview)
    return () => setUnmutedPlayer(PLAYERS.main)
  })
  return (
    <>
      <Heading>Preview</Heading>
      <PlayerPrimitive youtubeId={youtubePreviewId} controls={true} playerIdentifier={PLAYERS.preview} />
    </>
  )
}

export default Preview
