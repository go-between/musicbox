import React, { useEffect, useRef } from 'react'
import { Flex, Text } from 'rebass'

import { useCurrentRecordContext, useVideoContext } from 'Context'

import { Room as RoomType } from './graphql'
import { VideoDetails } from './VideoDetails'

const Main: React.FC<{ room: RoomType }> = ({ room }) => {
  // TODO:  Sort of a hack to ensure current record is set after room has
  // been activated.  This should be pulled out.
  const { currentRecord, setCurrentRecord } = useCurrentRecordContext()
  const { setVideoRef } = useVideoContext()
  useEffect(() => {
    setCurrentRecord(room.currentRecord)
  }, [room, setCurrentRecord])

  const videoRef = useRef()
  setVideoRef(videoRef)
  useEffect(() => {
    return () => setVideoRef(null)
  }, [setVideoRef])

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        height: 'auto',
        px: [0, 0, 0, 4],
        width: ['100%', '100%', '100%', '60%'],
      }}
    >
      <Flex
        ref={videoRef}
        sx={{
          bg: 'accentHover',
          alignItems: 'center',
          borderRadius: 6,
          boxShadow: 'xl',
          height: '300px',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Text>{!!currentRecord ? 'Video Hidden' : 'Nothing Playing'}</Text>
      </Flex>

      <VideoDetails />
    </Flex>
  )
}

export default Main
