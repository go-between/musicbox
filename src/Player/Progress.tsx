import React, { useEffect, useState } from 'react'
import { Box, Flex, Text } from 'rebass'
import moment from 'moment'

import { duration } from 'lib/formatters'
import { useCurrentRecordContext } from 'Context'

const Progress: React.FC = () => {
  const { currentRecord } = useCurrentRecordContext()
  const [progress, setProgress] = useState(0)
  const [playedSeconds, setPlayedSeconds] = useState(0)

  useEffect(() => {
    if (!currentRecord) {
      return
    }

    const playedAt = moment(currentRecord.playedAt)
    const endingAt = moment(currentRecord.playedAt).add(currentRecord.song.durationInSeconds, 'seconds')

    const interval = setInterval(() => {
      const now = moment()
      const timeRemaining = endingAt.diff(now, 'seconds')
      const percentPlayed = timeRemaining / currentRecord.song.durationInSeconds

      const timePlayed = now.diff(playedAt, 'seconds')

      setProgress((1 - percentPlayed) * 100)
      setPlayedSeconds(timePlayed)
    }, 500)

    return () => clearInterval(interval)
  }, [currentRecord])

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
