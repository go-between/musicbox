import React from 'react'
import { Box, Flex, Text } from 'rebass'
import Gravatar from 'react-gravatar'

import { useCurrentRecordContext } from 'Context'
import { MediaObject } from 'components'
import Approval from 'Approval'

import PlayerPrimitive from './PlayerPrimitive'
import Progress from './Progress'
import Settings from './Settings'
import Volume from './Volume'
import { PLAYERS } from './VolumeContextProvider'

const Player: React.FC = () => {
  const { currentRecord } = useCurrentRecordContext()

  if (!currentRecord) {
    return <></>
  }

  return (
    <>
      <Flex width="100%" flexDirection={['column', 'row']} sx={{ alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Box>
          <MediaObject imageUrl={currentRecord.song.thumbnailUrl} imageSize={['20px', '50px']} alignment="center" placeholderImageColor="accent">
            <Flex flexDirection="column">
              <Box mb={1}>
                <Text color="muted">Played By</Text>
              </Box>
              <Flex flexDirection="row" alignItems="center">
                <Gravatar email={currentRecord.user.email} size={16} style={{ borderRadius: '100%' }} />
                <Text ml={2}>{currentRecord.user.name}</Text>
              </Flex>
            </Flex>
          </MediaObject>
        </Box>

        <Flex alignItems="center">
          <Progress />
          <Volume />
          <Box mx={2} />
          <Settings />
        </Flex>
        <Flex>
          <Approval />
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
