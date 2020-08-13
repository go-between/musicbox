import React, { useEffect, useRef, useState } from 'react'
import { Box, Flex, Text } from 'rebass'

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

  if (!currentRecord) {
    return (
      <>
        something weird is going on here...
      </>
    )
  }

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        height: '100%',
        px: 3,
        width: ['100%', '100%', '100%', '60%'],
      }}
    >
      <Box
        sx={{
          overflowY: 'scroll',
        }}
      >
        <Flex
          ref={videoRef}
          sx={{
            bg: 'backgroundTint',
            alignItems: 'center',
            borderRadius: 6,
            boxShadow: 'xl',
            height: '350px',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Text>{!!currentRecord ? 'Video Hidden' : 'Nothing Playing'}</Text>
        </Flex>

        <VideoDetails />
      </Box>
    </Flex>
  )
}

export default Main
