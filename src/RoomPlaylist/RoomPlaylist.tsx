import React from 'react'
import { Box, Flex, Text } from 'rebass'

import { usePlaylistRecordsContext } from 'Context'

import { duration } from 'lib/formatters'
import { MediaObject } from 'components'

const RoomPlaylist: React.FC = () => {
  const { playlistRecords } = usePlaylistRecordsContext()
  const records = playlistRecords.map(record => {
    return (
      <Box
        as="li"
        key={record.id}
        sx={{
          borderBottom: '1px solid',
          borderColor: 'accent',
          listStyle: 'none',
          mx: 0,
          my: 3,
          pb: 3,
          width: '100%',
        }}
      >
        <MediaObject imageUrl={record.song.thumbnailUrl} imageSize="50px" alignment="center">
          <Box
            sx={{
              display: 'inline-block',
              fontSize: 1,
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: '100%',
            }}
          >
            <Text
              sx={{
                color: 'gray500',
                fontSize: 1,
                fontWeight: 300,
              }}
            >
              {record.user.name}
            </Text>

            {record.song.name}
          </Box>

          <Flex alignItems="center">
            <Box
              sx={{
                color: 'gray400',
                fontSize: 1,
                px: 3,
              }}
            >
              {duration(record.song.durationInSeconds)}
            </Box>
          </Flex>
        </MediaObject>
      </Box>
    )
  })
  return (
    <Box
      width="100%"
      as="ul"
      sx={{
        m: 0,
        p: 0,
      }}
    >
      {records}
    </Box>
  )
}

export default RoomPlaylist
