import React from 'react'
import { Box, Flex, Text } from 'rebass'
import { Eye } from 'react-feather'

import { useCurrentRecordContext } from 'Context'
import { MediaObject } from 'components'

import { useJumpNavigationContext } from 'JumpMenu/JumpNavigationContextProvider'
import { useInputContext } from 'JumpMenu/InputContextProvider'
import { Result as ResultType } from './deserialize'

const NowPlaying: React.FC = () => {
  return (
    <Flex alignItems="center">
      <Text
        sx={{
          color: 'gray500',
          fontSize: 0,
          fontWeight: 600,
          textTransform: 'uppercase',
        }}
      >
        Now playing
      </Text>
    </Flex>
  )
}

const Result: React.FC<{ result: ResultType }> = ({ result }) => {
  const { currentRecord } = useCurrentRecordContext()
  const { setYoutubePreviewId } = useInputContext()
  const { forward } = useJumpNavigationContext()

  const nowPlaying = currentRecord?.song.id === result.id

  const preview = (): void => {
    setYoutubePreviewId(result.youtubeId)
    forward('youtubePreview')
  }

  return (
    <Box
      as="li"
      sx={{
        alignItems: 'center',
        borderRadius: 3,
        listStyle: 'none',
        mx: 0,
        my: 2,
        px: 2,
        py: 3,
        width: '100%',
      }}
    >
      <MediaObject imageUrl={result.thumbnailUrl} imageSize="50px" alignment="center" placeholderImageColor="accent">
        <Box flex={1}>
          {nowPlaying ? <NowPlaying /> : <></>}
          <Box
            sx={{
              fontSize: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              mr: 2,
            }}
          >
            {result.name}
          </Box>
        </Box>

        <Flex alignItems="center" justifyContent="space-between">
          <Box
            sx={{
              alignItems: 'center',
              bg: 'accent',
              borderRadius: 4,
              color: 'text',
              cursor: 'pointer',
              display: 'flex',
              p: 1,
              mx: 1,
            }}
            onClick={preview}
          >
            <Eye size={18} />
          </Box>
        </Flex>
      </MediaObject>
    </Box>
  )
}

export default Result
