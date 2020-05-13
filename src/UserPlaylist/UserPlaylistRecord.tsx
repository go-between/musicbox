import React from 'react'
import { Box, Flex } from 'rebass'
import { X } from 'react-feather'

import { PlaylistRecord } from 'Context'
import { duration } from 'lib/formatters'
import { MediaObject } from 'components'

type Props = {
  record: PlaylistRecord
  onDelete: () => void
}
const UserPlaylistRecord: React.FC<Props> = ({ record, onDelete }) => {
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

          <Box
            as={X}
            onClick={onDelete}
            size={28}
            sx={{
              color: 'text',
              cursor: 'pointer',
              width: '24px',
              '&:hover': {
                bg: 'muted',
                borderRadius: 4,
              },
            }}
          />
        </Flex>
      </MediaObject>
    </Box>
  )
}

export default UserPlaylistRecord
