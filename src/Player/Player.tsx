import React, { useState, useEffect } from 'react'
import { Box, Button, Flex, Text } from 'rebass'
import { EyeOff, SkipForward, Volume2, Youtube } from 'react-feather'
import { Slider } from '@rebass/forms'
import { useMutation } from '@apollo/react-hooks'
import Gravatar from 'react-gravatar'

import { useWebsocketContext, useUserContext } from 'Context'
import { useCurrentRecordContext, usePlaylistRecordContext } from 'Room'
import { persistShowVideo, retrieveShowVideo, persistVolume } from 'lib/localStore'

import { ROOM_PLAYLIST_RECORD_ABANDON, RoomPlaylistRecordAbandon } from './graphql'
import PlayerPrimitive from './PlayerPrimitive'
import { useVolumeContext, PLAYERS } from './VolumeContextProvider'

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
  // const [volume, setVolume] = useState(retrieveVolume())
  const [showVideo, setShowVideo] = useState(retrieveShowVideo())
  const [progress, setProgress] = useState(0)

  const websocket = useWebsocketContext()
  const { deleteRecord } = usePlaylistRecordContext()
  const { currentRecord, setCurrentRecord } = useCurrentRecordContext()
  const { setUnmutedPlayer, setVolume, unmutedPlayer, volume } = useVolumeContext()

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
  const changeShowVideo = (): void => {
    setShowVideo(!showVideo)
    persistShowVideo(!showVideo)
  }
  const changeVolume = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    const volume = parseInt(ev.currentTarget.value, 10)
    setVolume(volume)
    persistVolume(volume)
    setUnmutedPlayer(PLAYERS.main)
  }

  const userOwnsCurrentRecord = currentRecord.user.id === user.id
  const skipButton = userOwnsCurrentRecord ? (
    <Button
      sx={{
        alignItems: 'center',
        display: 'flex',
        fontSize: 2,
        mr: 3,
      }}
      onClick={() => roomPlaylistRecordAbandon()}
    >
      <SkipForward size={16} />
      <Box px={2} />
      Skip Song
    </Button>
  ) : (
    ''
  )

  console.log('umutedPlayer:')
  console.log(unmutedPlayer)
  console.log('unmutedPlayer === PLAYERS.main:')
  console.log(unmutedPlayer === PLAYERS.main)
  return (
    <Box
      width="100%"
      sx={{
        mb: 4,
      }}
    >
      <Box width="100%" display={showVideo ? 'initial' : 'none'}>
        <PlayerPrimitive
          changeProgress={changeProgress}
          playedAt={currentRecord.playedAt}
          youtubeId={currentRecord.song.youtubeId}
          volume={unmutedPlayer === PLAYERS.main ? volume || 0 : 0}
        />
      </Box>

      <Box width="100%" height="6px" mb={2}>
        <Box width={`${progress}%`} height="100%" bg="text" />
      </Box>

      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text
          fontSize={[2]}
          sx={{
            minWidth: 0,
            width: '50%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {currentRecord.song.name}
        </Text>

        <Flex alignItems="center">
          <Text
            as="span"
            sx={{
              color: 'gray500',
              fontSize: 2,
              fontWeight: '800',
              px: 2,
              mb: 1,
              textAlign: 'right',
            }}
          >
            {currentRecord.user.name}
          </Text>
          <Gravatar email={currentRecord.user.email} size={32} style={{ borderRadius: '100%' }} />
        </Flex>
      </Flex>

      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" pr={4} width="100%">
          <Volume2 />
          <Box mx={2} />
          <Slider onChange={changeVolume} value={volume} />
        </Flex>

        <Flex
          sx={{
            justifyContent: 'space-between',
            minWidth: '280px',
          }}
        >
          {skipButton}
          <Button
            onClick={changeShowVideo}
            sx={{
              alignItems: 'center',
              display: 'flex',
              fontSize: 2,
            }}
          >
            <EyeOff size={16} />
            <Box px={2} />
            {showVideo ? 'Hide Video' : 'Show Video'}
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Player
