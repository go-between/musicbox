import React from 'react'
import { Box, Flex, Text } from 'rebass'

import { duration } from 'lib/formatters'
import { useCurrentRecordContext } from 'Context'

import { usePlayerContext } from './PlayerContextProvider'

const Progress: React.FC = () => {
  const { currentRecord } = useCurrentRecordContext()
  const { playedSeconds, progress } = usePlayerContext()

  if (!currentRecord) {
    return <></>
  }
  return (
    <>
      <Flex color="muted" minWidth="80px" justifyContent="center">
        {duration(playedSeconds)}
      </Flex>
      <Flex flexDirection="column" mx={3}>
        <Box>
          <Text
            fontSize={4}
            sx={{
              minWidth: 0,
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {currentRecord.song.name}
          </Text>
        </Box>
        <Box width="100%" height="6px" mb={2}>
          <Box width={`${progress}%`} height="100%" bg="text" />
        </Box>
      </Flex>
      <Flex color="muted" minWidth="80px" justifyContent="center">
        {duration(currentRecord.song.durationInSeconds)}
      </Flex>
    </>
  )
}
export default Progress
