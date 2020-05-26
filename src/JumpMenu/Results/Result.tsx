import React from 'react'
import { Box, Flex, Text } from 'rebass'
import { Check, Eye, Plus } from 'react-feather'
import { useToasts } from 'react-toast-notifications'

import { useCurrentRecordContext, usePlaylistRecordsContext, useAddRecordContext } from 'Context'
import { MediaObject } from 'components'
import { duration } from 'lib/formatters'

import { useQuickResultsContext } from '../QuickResultsContextProvider'
import { useInputContext } from '../InputContextProvider'
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
  const { playlistRecords } = usePlaylistRecordsContext()
  const { currentRecord } = useCurrentRecordContext()
  const { addRecords } = useAddRecordContext()
  const { setYoutubePreviewId } = useInputContext()
  const { forward } = useQuickResultsContext()
  const { addToast } = useToasts()

  const nowPlaying = currentRecord?.song.id === result.songId
  const alreadyAdded = nowPlaying || !!playlistRecords.find(r => r.song.id === result.songId)

  const enqueueRecord = (ev: React.MouseEvent): void => {
    ev.stopPropagation()
    addRecords(result.songId)
    addToast(`Successfully added ${result.name}`, { appearance: 'success', autoDismiss: true })
  }

  const preview = (): void => {
    setYoutubePreviewId(result.youtubeId)
    forward('youtube-preview')
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
              color: 'gray400',
              fontSize: 1,
              px: 3,
            }}
          >
            {duration(result.durationInSeconds)}
          </Box>
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

          <Box
            onClick={enqueueRecord}
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
          >
            {alreadyAdded ? <Check size={18} /> : <Plus size={18} />}
          </Box>
        </Flex>
      </MediaObject>
    </Box>
  )
}

export default Result
