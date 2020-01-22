import React, { useContext, useState, useEffect } from 'react'
import moment from 'moment'
import ReactPlayer from 'react-player'

import { WebsocketContext } from 'App'

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
  const [player, setPlayer] = useState<ReactPlayer>()
  const [record, setRecord] = useState<Record>()

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

  useEffect(() => {
    if (!record || !player) {
      return
    }
    const now = moment()
    const offset = moment.duration(now.diff(record.playedAt))

    player.seekTo(offset.as('seconds'))
  }, [player, record])

  if (!record) {
    return <p>Nothing Playing!</p>
  }

  const setRefFromPlayer = (player: ReactPlayer): void => setPlayer(player)
  return (
    <ReactPlayer
      ref={setRefFromPlayer}
      url={`https://www.youtube.com/watch?v=${record.song.youtubeId}`}
      controls={true}
      playing={true}
      volume={0}
      height="100%"
      width="100%"
    />
  )
}

export default Player
