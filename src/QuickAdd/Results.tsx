import React, { createRef, useEffect, MouseEvent } from 'react'
import { Box, Flex, Text } from 'rebass'
import { Check, Plus, ZoomIn } from 'react-feather'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { usePlaylistRecordContext } from 'Room/PlaylistRecordContextProvider'
import { useCurrentRecordContext } from 'Room/CurrentRecordContextProvider'

import PlayerPrimitive from '../Player/PlayerPrimitive'
import { useVolumeContext, PLAYERS } from '../Player/VolumeContextProvider'

import { Result } from './types'
import { useResultsContext, RESULTS_CONTEXTS } from './ResultsContextProvider'

const ReactSwal = withReactContent(Swal)

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

type SearchResultProps = {
  alreadyAdded: boolean
  libraryContext: boolean
  result: Result
  selectResult: (result: Result) => void
  selected: boolean
  nowPlaying: boolean
}

const SearchResult: React.FC<SearchResultProps> = ({
  alreadyAdded,
  libraryContext,
  nowPlaying,
  result,
  selectResult,
  selected,
}) => {
  const { setUnmutedPlayer, volume } = useVolumeContext()

  const onClick = (ev: React.MouseEvent): void => {
    ev.stopPropagation()
    selectResult(result)
  }

  const showPreview = (e: MouseEvent): void => {
    e.stopPropagation()
    setUnmutedPlayer(PLAYERS.preview)
    ReactSwal.fire({
      allowOutsideClick: () => true,
      animation: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: libraryContext ? 'Add to room' : 'Add to My Library & Room',
      showCancelButton: true,
      title: result.name,
      html: <PlayerPrimitive playedAt="" youtubeId={result.youtubeId} volume={volume} />,
      width: '30%',
    }).then(userAction => {
      if (userAction.value) {
        selectResult(result)
      }
      setUnmutedPlayer(PLAYERS.main)
    })
  }

  return (
    <Box
      as="li"
      onClick={onClick}
      sx={{
        alignItems: 'center',
        borderRadius: 3,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        listStyle: 'none',
        mx: 0,
        my: 2,
        px: 2,
        py: 3,
        bg: `${selected ? '#4A5568' : 'initial'}`,
        '&:hover': {
          bg: '#4A5568',
        },
      }}
    >
      <Box>
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
      <Box
        sx={{
          alignItems: 'center',
          color: 'text',
          cursor: 'pointer',
          display: 'flex',
          p: 1,
          mx: 1,
        }}
      >
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
          onClick={showPreview}
        >
          <ZoomIn size={18} />
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
        >
          {alreadyAdded ? <Check size={18} /> : <Plus size={18} />}
        </Box>
      </Box>
    </Box>
  )
}

const FloatingResults: React.FC = ({ children }) => {
  return (
    <Box
      sx={{
        bg: 'accent',
        borderRadius: 4,
        position: 'absolute',
        top: '105%',
        left: 0,
        right: 0,
        maxHeight: '400px',
        overflow: 'scroll',
        px: 3,
        transition: 'all 2s ease-in',
      }}
    >
      {children}
    </Box>
  )
}

const Results: React.FC = () => {
  const { error, results, resultIndex, setQuery, selectResult, setResults } = useResultsContext()
  const { playlistRecords } = usePlaylistRecordContext()
  const { currentRecord } = useCurrentRecordContext()
  const resultsRef = createRef<HTMLUListElement>()
  const selectedRef = createRef<HTMLDivElement>()

  const libraryContext = results[0]?.resultType === RESULTS_CONTEXTS.library

  const resultItems = results.map((result, idx) => {
    const alreadyAdded =
      !!playlistRecords.find(record => record.song.id === result.id) || currentRecord?.song.id === result.id
    const nowPlaying = currentRecord?.song.id === result.id

    if (idx === resultIndex) {
      return (
        <Box key={result.id} ref={selectedRef}>
          <SearchResult
            result={result}
            nowPlaying={nowPlaying}
            libraryContext={libraryContext}
            selectResult={selectResult}
            selected={true}
            alreadyAdded={alreadyAdded}
          />
        </Box>
      )
    }

    return (
      <SearchResult
        key={result.id}
        nowPlaying={nowPlaying}
        libraryContext={libraryContext}
        result={result}
        selectResult={selectResult}
        selected={false}
        alreadyAdded={alreadyAdded}
      />
    )
  })

  useEffect(() => {
    const clear = (): void => {
      setResults([])
      setQuery('')
    }

    if (results.length > 0) {
      window.addEventListener('click', clear, false)
    }

    return () => window.removeEventListener('click', clear, false)
  }, [results, setQuery, setResults])

  useEffect(() => {
    if (!resultsRef?.current?.parentElement || !selectedRef?.current) {
      return
    }

    const parent = resultsRef.current.parentElement
    const parentStyles = window.getComputedStyle(parent)
    const height = parseInt(parentStyles.getPropertyValue('height'))
    const selectedStyles = window.getComputedStyle(selectedRef.current)
    const selectedHeight = parseInt(selectedStyles.getPropertyValue('height'))

    if (selectedRef.current.offsetTop > height + parent.scrollTop - selectedHeight) {
      parent.scrollTop = selectedRef.current.offsetTop
    } else if (selectedRef.current.offsetTop < parent.scrollTop) {
      parent.scrollTop = parent.scrollTop - height
    }
  }, [resultIndex, resultsRef, selectedRef])

  if (!!error) {
    return <Box p={3}>{error}</Box>
  }

  if (results.length === 0) {
    return <></>
  }

  return (
    <FloatingResults>
      <Box
        ref={resultsRef}
        as="ul"
        sx={{
          m: 0,
          p: 0,
        }}
      >
        {resultItems}
      </Box>
    </FloatingResults>
  )
}

export default Results
