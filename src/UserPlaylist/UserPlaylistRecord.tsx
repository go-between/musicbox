import React from 'react'
import { Box, Image } from 'rebass'
import { X } from 'react-feather'

import { RoomPlaylistRecord } from './graphql'

type Props = {
  record: RoomPlaylistRecord
  onDelete: () => void
}
const UserPlaylistRecord: React.FC<Props> = ({ record, onDelete }) => {
  return (
    <Box
      as="li"
      key={record.id}
      sx={{
        alignItems: 'center',
        borderBottom: '1px solid',
        borderColor: 'muted',
        display: 'flex',
        justifyContent: 'space-between',
        listStyle: 'none',
        mx: 0,
        my: 3,
        pb: 3,
      }}
    >
      <Image src={record.song.thumbnailUrl} />
      <Box
        as="span"
        sx={{
          fontSize: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          mr: 2,
        }}
      >
        {record.song.name}
      </Box>

      <Box>
        {record.song.durationInSeconds}
      </Box>

      <Box
        onClick={onDelete}
        sx={{
          alignItems: 'center',
          bg: 'accent',
          borderRadius: 4,
          color: 'text',
          cursor: 'pointer',
          display: 'flex',
          p: 1,
          mx: 1,
          '&:hover': {
            bg: 'muted',
          },
        }}
      >
        <X size={18} />
      </Box>
    </Box>
  )
}

export default UserPlaylistRecord
