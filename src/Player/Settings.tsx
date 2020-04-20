import React from 'react'
import { Box, Flex, Text } from 'rebass'
import { EyeOff, SkipForward, Settings as SettingsIcon } from 'react-feather'
import { useMutation } from '@apollo/react-hooks'

import { useCurrentRecordContext, useUserContext } from 'Context'

import { ROOM_PLAYLIST_RECORD_ABANDON, RoomPlaylistRecordAbandon } from './graphql'
import { usePlayerContext } from './PlayerContextProvider'

const Settings: React.FC = () => {
  const user = useUserContext()
  const { currentRecord } = useCurrentRecordContext()
  const { showVideo, toggleShowVideo } = usePlayerContext()

  const [roomPlaylistRecordAbandon] = useMutation<RoomPlaylistRecordAbandon['data'], RoomPlaylistRecordAbandon['vars']>(
    ROOM_PLAYLIST_RECORD_ABANDON,
  )

  if (!currentRecord) {
    return <></>
  }

  const userOwnsCurrentRecord = currentRecord.user.id === user.id
  const skipSong = userOwnsCurrentRecord ? (
    <Text
      sx={{
        alignItems: 'center',
        display: 'flex',
        fontSize: 2,
        mr: 3,
        textDecoration: 'underline',
      }}
      onClick={() => roomPlaylistRecordAbandon()}
    >
      <SkipForward size={16} />
      <Box px={1} />
      Skip Song
    </Text>
  ) : (
    <></>
  )

  return (
    <Flex sx={{ cursor: 'pointer', position: 'relative', '&:hover > *': { visibility: 'visible' } }}>
      <Box
        sx={{
          bg: 'background',
          position: 'absolute',
          left: 0,
          bottom: '100%',
          p: 2,
          width: '160px',
          visibility: 'hidden',
        }}
      >
        {skipSong}
        <Text
          sx={{
            alignItems: 'center',
            display: 'flex',
            fontSize: 2,
            mr: 3,
            textDecoration: 'underline',
          }}
          onClick={toggleShowVideo}
        >
          <EyeOff size={16} />
          <Box px={1} />
          {showVideo ? 'Hide Video' : 'Show Video'}
        </Text>
      </Box>
      <Box sx={{ zIndex: 100 }}>
        <SettingsIcon />
      </Box>
    </Flex>
  )
}
export default Settings
