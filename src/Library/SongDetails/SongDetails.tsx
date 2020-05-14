import React, { useEffect } from 'react'
import { Box, Flex, Text } from 'rebass'
import { useLazyQuery } from '@apollo/react-hooks'
import ReactPlayer from 'react-player'

import { SidePanel } from 'components'
import { duration } from 'lib/formatters'
import { LibraryRecordQuery, LIBRARY_RECORD_QUERY } from './graphql'
import { useSearchContext } from '../SearchContextProvider'

import Recommendations from './Recommendations'

const SongDetails: React.FC = () => {
  const { activeSongId, setActiveSongId } = useSearchContext()
  const [retrieveSong, { data }] = useLazyQuery<LibraryRecordQuery['data'], LibraryRecordQuery['vars']>(
    LIBRARY_RECORD_QUERY,
    {
      fetchPolicy: 'network-only',
    },
  )

  const closeSongDetails = (): void => setActiveSongId('')

  useEffect(() => {
    if (!activeSongId) {
      return
    }

    retrieveSong({ variables: { id: activeSongId } })
  }, [activeSongId, retrieveSong])

  if (!activeSongId || !data) {
    return <></>
  }

  return (
    <SidePanel closeSidePanel={closeSongDetails} showSidePanel={!!activeSongId}>
      <Flex
        sx={{
          border: '1px solid',
          borderColor: 'accent',
          borderRadius: 6,
          boxShadow: 'xxl',
          height: '250px',
          mb: 3,
          overflow: 'hidden',
        }}
      >
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${data.libraryRecord.song.youtubeId}`}
          playing={false}
          height="100%"
          width="100%"
          style={{ display: 'flex' }}
        />
      </Flex>

      <Flex alignItems="center" justifyContent="space-between" mb={3}>
        <Text
          sx={{
            fontSize: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {data.libraryRecord.song.name}
        </Text>

        <Box sx={{ fontSize: 2, minWidth: 'auto' }}>{duration(data.libraryRecord.song.durationInSeconds)}</Box>
      </Flex>

      <Flex
        as="ul"
        sx={{
          alignItems: 'center',
          flexWrap: 'wrap',
          mb: 3,
          p: 0,
          width: '100%',
        }}
      >
        {data.libraryRecord.tags.map(t => (
          <Box
            key={t.id}
            as="li"
            sx={{
              bg: 'accent',
              borderRadius: 3,
              fontSize: 1,
              fontWeight: 600,
              p: 1,
              mb: 2,
              listStyle: 'none',
              '&:not(:last-child)': {
                mr: 2,
              },
            }}
          >
            {t.name}
          </Box>
        ))}
      </Flex>

      <Recommendations songId={data.libraryRecord.song.id} youtubeId={data.libraryRecord.song.youtubeId} />
    </SidePanel>
  )
}

export default SongDetails
