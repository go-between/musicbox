import React, { useState, useEffect } from 'react'
import { Box, Button, Flex, Text } from 'rebass'
import { Youtube } from 'react-feather'
import { Label, Slider } from '@rebass/forms'
import { useMutation } from '@apollo/react-hooks'

import { useWebsocketContext, useUserContext } from 'Context'
import { useCurrentRecordContext, usePlaylistRecordContext } from 'Room'

import { ROOM_PLAYLIST_RECORD_ABANDON, RoomPlaylistRecordAbandon } from './graphql'
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

  const websocket = useWebsocketContext()
  const { deleteRecord } = usePlaylistRecordContext()
  const { currentRecord, setCurrentRecord } = useCurrentRecordContext()

  const [roomPlaylistRecordAbandon] = useMutation<RoomPlaylistRecordAbandon['data'], RoomPlaylistRecordAbandon['vars']>(
    ROOM_PLAYLIST_RECORD_ABANDON,
  )

  useEffect(() => {
    return websocket.subscribeToNowPlaying(nowPlaying => {
      setCurrentRecord(nowPlaying.currentRecord)
      if (!!nowPlaying.currentRecord) {
        deleteRecord(nowPlaying.currentRecord.id, { persist: false })
      }
    })
  }, [deleteRecord, setCurrentRecord, websocket])

  const user = useUserContext()

  if (!currentRecord) {
    return (
      <Flex
        sx={{
          alignItems: 'center',
          border: '1px solid',
          borderColor: 'accent',
          borderRadius: 6,
          boxShadow: 'xl',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '350px',
          mb: 4,
        }}
      >
        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            bg: 'accent',
            borderRadius: '100%',
            color: 'text',
            p: 3,
          }}
        >
          <Youtube />
        </Flex>

        <Box p={2}>Nothing Playing! Add a song to start jamming!</Box>
      </Flex>
    )
  }

  const changeProgress = (opts: { played: number }): void => {
    setProgress(opts.played * 100)
  }
  const changeVolume = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setVolume(parseInt(ev.currentTarget.value, 10))
  }

  const userOwnsCurrentRecord = currentRecord.user.id === user.id
  const skipButton = userOwnsCurrentRecord ? <Button onClick={() => roomPlaylistRecordAbandon()}>Skip Song</Button> : ''
  return (
    <Box
      width="100%"
      sx={{
        mb: 4,
      }}
    >
      <Box width="100%">
        <Flex alignItems="center" justifyContent="space-between" mb={3}>
          <Text fontSize={[2, 3]}>
            {currentRecord.song.name} by {currentRecord.user.name}
          </Text>

          {skipButton}
        </Flex>

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
