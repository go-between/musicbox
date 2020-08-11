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
    <Box
      onClick={() => roomPlaylistRecordAbandon()}
    >
      <SkipForward size={20} />
    </Box>
  ) : (
    <></>
  )

  return (
    <Flex
      alignItems='center'
    >
      {skipSong}
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          fontSize: 2,
          mr: 3,
          textDecoration: 'underline',
        }}
        onClick={toggleShowVideo}
      >
        <EyeOff size={20} />
      </Box>
    </Flex>
  )
}
export default Settings
