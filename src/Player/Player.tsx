import React, { useContext, useState, useEffect } from 'react'
import { Box } from 'rebass'
import { Label, Slider } from '@rebass/forms'

import { WebsocketContext } from 'App'
import { PlaylistRecordContext } from 'Room'

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
  const [volume, setVolume] = useState(100)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setRecord(currentRecord)
  }, [currentRecord])

  const websocket = useContext(WebsocketContext)
  const { deleteRecord } = useContext(PlaylistRecordContext)
  useEffect(() => {
    if (!websocket) {
      return
    }

    return websocket.subscribeToNowPlaying(nowPlaying => {
      setRecord(nowPlaying.currentRecord)
      if (!!nowPlaying.currentRecord) {
        deleteRecord(nowPlaying.currentRecord.id, { persist: false })
      }
    })
  }, [deleteRecord, websocket])

  if (!record) {
    return <p>Nothing Playing!</p>
  }

  const changeProgress = (opts: { played: number }): void => {
    setProgress(opts.played * 100)
  }
  const changeVolume = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setVolume(parseInt(ev.currentTarget.value, 10))
  }

  return (
    <Box
      sx={{
        mb: 3,
      }}
    >
      <Box
        sx={{
          height: '300px',
        }}
      >
        <PlayerPrimitive
          changeProgress={changeProgress}
          playedAt={record.playedAt}
          youtubeId={record.song.youtubeId}
          volume={volume}
        />
      </Box>
      <Box width="100%" height="6px">
        <Box width={`${progress}%`} height="100%" bg="text" />
      </Box>

      <Box mb={4}>
        <Label>Volume</Label>
        <Slider onChange={changeVolume} value={volume} />
      </Box>
    </Box>
  )
}

export default Player
