import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Box, Flex } from 'rebass'
import { Plus, X } from 'react-feather'

import { RoomPlaylistRecordsReorder } from './PlaylistManagement'
import {
  SONGS_QUERY,
  USER_LIBRARY_RECORD_DELETE_MUTATION,
  OrderedRecord,
  RoomPlaylistRecord,
  SongsQuery,
  UserLibraryRecordDeleteMutation,
} from './graphql'

type Props = {
  roomPlaylistRecordsReorder: RoomPlaylistRecordsReorder[0]
  roomPlaylistRecords: RoomPlaylistRecord[]
}
const Library: React.FC<Props> = ({ roomPlaylistRecordsReorder, roomPlaylistRecords }) => {
  const { data, loading } = useQuery<SongsQuery['data']>(SONGS_QUERY)
  const [userLibraryRecordDelete] = useMutation<
    UserLibraryRecordDeleteMutation['data'],
    UserLibraryRecordDeleteMutation['vars']
  >(USER_LIBRARY_RECORD_DELETE_MUTATION, { refetchQueries: ['SongsQuery'] })

  if (loading) {
    return <p>Loading...</p>
  }

  const songs = data?.songs.map(s => {
    const addSong = (): void => {
      const orderedRecords: OrderedRecord[] = roomPlaylistRecords.map(record => ({
        roomPlaylistRecordId: record.id,
        songId: record.song.id,
      }))

      orderedRecords.push({ songId: s.id })

      roomPlaylistRecordsReorder({ variables: { orderedRecords } })
    }

    const deleteSong = (): void => {
      userLibraryRecordDelete({ variables: { id: s.id } })
    }
    return (
      <Box
        as="li"
        key={s.id}
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
          {s.name}
        </Box>

        <Flex>
          <Box
            onClick={addSong}
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
              }
            }}
          >
            <Plus size={18} />
          </Box>
          <Box
            onClick={deleteSong}
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
              }
            }}
          >
            <X size={18} />
          </Box>
        </Flex>
      </Box>
    )
  })
  return (
    <Box
      as="ul"
      sx={{
        m: 0,
        p: 0,
      }}
    >
      {songs}
    </Box>
  )
}

export default Library
