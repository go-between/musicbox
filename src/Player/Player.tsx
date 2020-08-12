import React from 'react'
import { Box, Flex, Link, Text } from 'rebass'
// import Gravatar from 'react-gravatar'
import { VideoOff, SkipForward, Youtube } from 'react-feather'
import { useMutation } from '@apollo/react-hooks'

import { useCurrentRecordContext, useUserContext } from 'Context'
import { MediaObject } from 'components'
import Approval from 'Approval'

import PlayerPrimitive from './PlayerPrimitive'
import Progress from './Progress'
import Volume from './Volume'
import { PLAYERS } from './VolumeContextProvider'
import { usePlayerContext } from './PlayerContextProvider'
import { ROOM_PLAYLIST_RECORD_ABANDON, RoomPlaylistRecordAbandon } from './graphql'

const Player: React.FC = () => {
  const { currentRecord } = useCurrentRecordContext()
  const user = useUserContext()
  const { showVideo, toggleShowVideo } = usePlayerContext()

  const [roomPlaylistRecordAbandon] = useMutation<RoomPlaylistRecordAbandon['data'], RoomPlaylistRecordAbandon['vars']>(
    ROOM_PLAYLIST_RECORD_ABANDON,
  )


  if (!currentRecord) {
    return <></>
  }

  const userOwnsCurrentRecord = currentRecord.user.id === user.id
  const skipSong = userOwnsCurrentRecord ? (
    <Box
      onClick={() => roomPlaylistRecordAbandon()}
      sx={{
        alignItems: 'center',
        bg: 'background',
        borderRadius: 6,
        color: 'muted',
        cursor: 'pointer',
        display: 'flex',
        p: 2,
        '&:hover': {
          bg: `primaryHover`,
          color: 'primary'
        }
      }}
    >
      <SkipForward size={20} />
    </Box>
  ) : (
    <></>
  )

  return (
    <>
      <Flex
        width="100%"
        flexDirection={['column', 'row']}
        sx={{
          alignItems: 'center',
          bg: 'accentHover',
          borderRadius: 6,
          boxShadow: 'xl',
          justifyContent: 'space-between',
          py: 3,
          px: 3,
        }}
      >
        <MediaObject
          imageUrl={currentRecord.song.thumbnailUrl}
          imageSize={['20px', '50px']}
          alignment="center"
          placeholderImageColor="accent"
        >
          <Flex flexDirection="column">
            <Approval />
            {/* <Flex flexDirection="row" alignItems="center">
              <Gravatar email={currentRecord.user.email} size={16} style={{ borderRadius: '100%' }} />
              <Text ml={2}>{currentRecord.user.name}</Text>
            </Flex> */}
          </Flex>
        </MediaObject>

        <Flex alignItems="center" justifyContent='center' flexDirection='column' flex='1'>
          <Box width='35%'>
            <Text
              sx={{
                color: 'text',
                fontSize: 2,
                minWidth: 0,
                width: '100%',
                overflow: 'hidden',
                textAlign: 'center',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >{currentRecord.song.name}</Text>
          </Box>

          <Box mx={1} mb={2} width='55%'>
            <Progress />
          </Box>
        </Flex>

        <Flex>
            <Volume />
            <Box mx={1} />
            {skipSong}
            <Box mx={1} />
            <Box
              onClick={toggleShowVideo}
              sx={{
                alignItems: 'center',
                bg: showVideo ? 'background' : 'primaryHover',
                borderRadius: 6,
                color: showVideo ? 'muted' : 'primary',
                cursor: 'pointer',
                display: 'flex',
                p: 2,
                '&:hover': {
                  bg: 'primaryHover',
                  color: 'primary'
                }
              }}
            >
              <VideoOff size={20}/>
            </Box>
            <Box mx={1} />
            <Link
              href={`https://youtube.com/watch?v=${currentRecord.song.youtubeId}`}
              target="_blank"
              sx={{
                alignItems: 'center',
                bg: 'background',
                borderRadius: 6,
                color: 'muted',
                display: 'flex',
                p: 2,
                '&:hover': {
                  bg: 'primaryHover',
                  color: 'primary'
                }
              }}
            >
              <Youtube size={20} />
            </Link>
          </Flex>
      </Flex>

      <PlayerPrimitive
        playedAt={currentRecord.playedAt}
        youtubeId={currentRecord.song.youtubeId}
        playerIdentifier={PLAYERS.main}
      />
    </>
  )
}

export default Player
