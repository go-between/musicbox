import React, { useContext, useState, useEffect } from 'react'
import { Box, Text } from 'rebass'
import { Label, Slider } from '@rebass/forms'

import { WebsocketContext } from 'App'
import { CurrentRecordContext, PlaylistRecordContext } from 'Room'

import PlayerPrimitive from './PlayerPrimitive'

type Record = {
  playedAt: string
  song: {
    name: string
    youtubeId: string
  }
  user: {
    name: string
    email: string
  }
}

const Player: React.FC = () => {
  const [volume, setVolume] = useState(100)
  const [progress, setProgress] = useState(0)

  const websocket = useContext(WebsocketContext)
  const { deleteRecord } = useContext(PlaylistRecordContext)
  const { currentRecord, setCurrentRecord } = useContext(CurrentRecordContext)

  useEffect(() => {
    return websocket.subscribeToNowPlaying(nowPlaying => {
      setCurrentRecord(nowPlaying.currentRecord)
      if (!!nowPlaying.currentRecord) {
        deleteRecord(nowPlaying.currentRecord.id, { persist: false })
      }
    })
  }, [deleteRecord, setCurrentRecord, websocket])

  if (!currentRecord) {
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
      width="100%"
      sx={{
        mb: 4,
      }}
    >
      <Box width="100%">
        <Text fontSize={[2, 3]} mb={3}>
          {currentRecord.song.name} by {currentRecord.user.name}
        </Text>

        <PlayerPrimitive
          changeProgress={changeProgress}
          playedAt={currentRecord.playedAt}
          youtubeId={currentRecord.song.youtubeId}
          volume={volume}
        />
      </Box>

      <Box width="100%" height="6px" mb={4}>
        <Box width={`${progress}%`} height="100%" bg="text" />
      </Box>

      <Box>
        <Label>Volume</Label>
        <Slider onChange={changeVolume} value={volume} />
      </Box>
    </Box>
  )
}

export default Player
