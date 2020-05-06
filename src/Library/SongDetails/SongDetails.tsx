import React, { useEffect } from 'react'
import { Box, Flex, Text } from 'rebass'
import { useLazyQuery } from '@apollo/react-hooks'
import { XCircle } from 'react-feather'
import ReactPlayer from 'react-player'

import { duration } from 'lib/formatters'
import { SongQuery, SONG_QUERY } from './graphql'
import { useSearchContext } from '../SearchContextProvider'

import Recommendations from './Recommendations'

const SongDetails: React.FC = () => {
  const { activeSongId, setActiveSongId } = useSearchContext()
  const [retrieveSong, { data }] = useLazyQuery<SongQuery['data'], SongQuery['vars']>(SONG_QUERY, {
    fetchPolicy: 'network-only',
  })

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
    <Flex
      as="aside"
      sx={{
        bg: 'background',
        border: '1px solid',
        borderColor: 'accent',
        boxShadow: 'xl',
        color: 'text',
        flexDirection: 'column',
        height: '100%',
        overflow: 'scroll',
        p: 4,
        position: 'absolute',
        right: 0,
        width: '400px',
      }}
    >
      <Box
        onClick={closeSongDetails}
        sx={{
          textAlign: 'right',
          mb: 3,
        }}
      >
        <Text
          sx={{
            alignItems: 'center',
            cursor: 'pointer',
            display: 'inline-flex',
            py: 1,
            px: 2,
            mr: 2,
            '&:hover': {
              bg: 'accent',
              borderRadius: 6,
            },
          }}
        >
          Close
          <Box as={XCircle} ml={2} />
        </Text>
      </Box>

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
          url={`https://www.youtube.com/watch?v=${data.song.youtubeId}`}
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
          {data.song.name}
        </Text>

        <Box sx={{ fontSize: 2, minWidth: 'auto' }}>{duration(data.song.durationInSeconds)}</Box>
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
        {data.song.tags.map(t => (
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

      <Recommendations songId={data.song.id} youtubeId={data.song.youtubeId} />
    </Flex>
  )
}

export default SongDetails
