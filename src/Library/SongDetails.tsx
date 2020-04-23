import React, { useEffect } from 'react'
import { Heading, Box, Link, Flex } from 'rebass'
import { useLazyQuery } from '@apollo/react-hooks'

import { SongQuery, SONG_QUERY } from './graphql'
import { useSearchContext } from './SearchContextProvider'

const SongDetails: React.FC = () => {
  const { activeSongId } = useSearchContext()
  const [retrieveSong, { data }] = useLazyQuery<SongQuery['data'], SongQuery['vars']>(SONG_QUERY, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (!activeSongId) {
      return
    }

    retrieveSong({ variables: { id: activeSongId } })
  }, [activeSongId, retrieveSong])

  if (!activeSongId || !data) {
    return (
      <Flex
        as="aside"
        sx={{
          borderLeft: '1px solid',
          borderColor: 'accent',
          color: 'text',
          flexDirection: 'column',
          height: '100%',
          overflow: 'scroll',
          p: 4,
          width: ['100%', '30%'],
        }}
      >
        Select a Song
      </Flex>
    )
  }

  return (
    <Flex
      as="aside"
      sx={{
        borderLeft: '1px solid',
        borderColor: 'accent',
        color: 'text',
        flexDirection: 'column',
        height: '100%',
        overflow: 'scroll',
        p: 4,
        width: ['100%', '30%'],
      }}
    >
      <Heading>{data.song.name}</Heading>
      <Box>Duration: {data.song.durationInSeconds}</Box>
      <Box>
        <Link color="text" href={`https://youtube.com?v=${data.song.youtubeId}`} target="_blank">
          Youtube
        </Link>
      </Box>
      <Box>
        Tags
        <Box as="ul">
          {data.song.tags.map(t => (
            <Box key={t.id} as="li">
              {t.name}
            </Box>
          ))}
        </Box>
      </Box>
    </Flex>
  )
}

export default SongDetails
