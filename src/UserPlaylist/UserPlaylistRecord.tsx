import React from 'react'
import moment from 'moment'
import { Box, Flex, Image } from 'rebass'
import { Image as ImageIcon, X } from 'react-feather'

import { RoomPlaylistRecord } from './graphql'
import { duration } from 'lib/formatters'

type Props = {
  record: RoomPlaylistRecord
  onDelete: () => void
}
const UserPlaylistRecord: React.FC<Props> = ({ record, onDelete }) => {
  const songDuration = moment.duration(record.song.durationInSeconds, 'seconds')

  const renderThumbnail = (thumbnailUrl: string) => {
    if (!thumbnailUrl) {
      return(
        <Flex
          sx={{
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'accent',
            borderRadius: 3,
            boxShadow: 'xl',
            height: '100%',
            justifyContent: 'center',
            p: 2,
            width: '50px'
          }}
        >
         <Box as={ImageIcon} size={20} color="muted" />
        </Flex>
      )
    }
    return (
      <Image
          src={thumbnailUrl}
          sx={{
            borderRadius: 3,
            boxShadow: 'xl',
            height: '100%',
            width: '100%'
          }}
      />
    )
  }

  return (
    <Box
      as="li"
      key={record.id}
      sx={{
        alignItems: 'center',
        borderBottom: '1px solid',
        borderColor: 'accent',
        display: 'flex',
        listStyle: 'none',
        mx: 0,
        my: 3,
        pb: 3,
        width: '100%'
      }}
    >
      <Box
        sx={{
          width: '50px',
        }}
      >
        {renderThumbnail(record.song.thumbnailUrl)}
      </Box>

      <Box
        sx={{
          display: 'inline-block',
          fontSize: 1,
          mx: 3,
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
          {duration(songDuration)}
        </Box>

        <Box
          onClick={onDelete}
          sx={{
            alignItems: 'center',
            color: 'text',
            cursor: 'pointer',
            display: 'flex',
            height: '24px',
            widht: '24px',
            '&:hover': {
              bg: 'muted',
              borderRadius: 4,
            },
          }}
        >
          <X size={24} />
        </Box>
      </Flex>
    </Box>
  )
}

export default UserPlaylistRecord
