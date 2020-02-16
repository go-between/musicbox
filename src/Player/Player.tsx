import React, { useContext, useState, useEffect } from 'react'
import { Box } from 'rebass'

import { WebsocketContext } from 'App'

import PlayerPrimitive from './PlayerPrimitive'

type Record = {
  playedAt: string
  song: {
    name: string
    youtubeId: string
  }
}
type Props = {
  currentRecord?: Record
}
const Player: React.FC<Props> = ({ currentRecord }) => {
  const [record, setRecord] = useState<Record>()
  const [volume, setVolume] = useState(1)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setRecord(currentRecord)
  }, [currentRecord])

  const websocket = useContext(WebsocketContext)
  useEffect(() => {
    if (!websocket) {
      return
    }

    return websocket.subscribeToNowPlaying(nowPlaying => {
      setRecord(nowPlaying.currentRecord)
    })
  }, [websocket])

  if (!record) {
    return <p>Nothing Playing!</p>
  }

  const changeProgress = (opts: { played: number }): void => {
    setProgress(opts.played * 100)
  }
  const changeVolume = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setVolume(parseFloat(ev.currentTarget.value))
  }

  return (
    <>
      <PlayerPrimitive
        changeProgress={changeProgress}
        playedAt={record.playedAt}
        youtubeId={record.song.youtubeId}
        volume={volume}
      />
      <Box width="100%" height="6px">
        <Box width={`${progress}%`} height="100%" bg="text" />
      </Box>
      <input onChange={changeVolume} type="range" min="0" max="1" step=".01" />
    </>
  )
}

export default Player
