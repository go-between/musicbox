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
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Text
        sx={{
          color: 'muted',
          fontSize: [1, 2],
        }}
      >
        {duration(playedSeconds)}
      </Text>

      <Box
        sx={{
          bg: 'primaryHover',
          borderRadius: 6,
          flex: 1,
          height: '6px',
          mx: 2,
        }}
      >
        <Box width={`${progress}%`} height="6px" bg="primary" sx={{ borderRadius: 6, width: '100%' }} />
      </Box>

      <Text
        sx={{
          color: 'muted',
          fontSize: [1, 2],
        }}
      >
        {duration(currentRecord.song.durationInSeconds)}
      </Text>
    </Flex>
  )
}
export default Progress
