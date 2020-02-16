import React, { useContext, useState, useEffect } from 'react'

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

  const changeVolume = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setVolume(parseFloat(ev.currentTarget.value))
  }

  return (
    <>
      <PlayerPrimitive playedAt={record.playedAt} youtubeId={record.song.youtubeId} volume={volume} />
      <input onChange={changeVolume} type="range" min="0" max="1" step=".01" />
    </>
  )
}

export default Player
