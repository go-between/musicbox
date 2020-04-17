import React, { createRef, useEffect, useState } from 'react'
import moment from 'moment'
import { Box, Button, Image, Flex, Text } from 'rebass'
import { Check, Eye, Plus } from 'react-feather'
import { useToasts } from 'react-toast-notifications'

import { Modal } from 'components'
import { useCurrentRecordContext, usePlaylistRecordContext } from 'Room'
import PlayerPrimitive from 'Player/PlayerPrimitive'
import { useVolumeContext, PLAYERS } from 'Player/VolumeContextProvider'
import { duration } from 'lib/formatters'

import { Song } from './graphql'
import { useResultsContext } from './ResultsContextProvider'

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
  result: Song
  selected: boolean
  nowPlaying: boolean
}

const SearchResult: React.FC<SearchResultProps> = ({ alreadyAdded, nowPlaying, result, selected }) => {
  const { setUnmutedPlayer, volume } = useVolumeContext()
  const { addRecord } = usePlaylistRecordContext()
  const { addToast } = useToasts()

  const [showModal, setShowModal] = useState(false)

  const openModal = (ev: React.MouseEvent): void => {
    ev.stopPropagation()
    setShowModal(true)
    setUnmutedPlayer(PLAYERS.preview)
  }
  const closeModal = (ev?: React.MouseEvent): void => {
    if (ev) {
      ev.stopPropagation()
    }
    setShowModal(false)
    setUnmutedPlayer(PLAYERS.main)
  }

  const onClick = (ev: React.MouseEvent): void => {
    ev.stopPropagation()
    addRecord(result.id)
    addToast(`Successfully added ${result.name}`, { appearance: 'success', autoDismiss: true })
    if (showModal) {
      closeModal()
    }
  }

  const songDuration = moment.duration(result.durationInSeconds, 'seconds')

  return (
    <Box
      as="li"
      onClick={onClick}
      sx={{
        alignItems: 'center',
        bg: `${selected ? '#4A5568' : 'initial'}`,
        borderRadius: 3,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        listStyle: 'none',
        mx: 0,
        my: 2,
        px: 2,
        py: 3,
        width: '100%',
        '&:hover': {
          bg: '#4A5568',
        },
      }}
    >
      <Box
        sx={{
          width: '50px',
        }}
      >
        <Image
          src={result.thumbnailUrl}
          sx={{
            borderRadius: 3,
            boxShadow: 'xl',
            height: '100%',
            width: '100%'
          }}
        />
      </Box>

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
          onClick={openModal}
        >
          <Eye size={18} />
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

      <Modal showModal={showModal} closeModal={closeModal} title="Preview Song">
        <PlayerPrimitive playedAt="" youtubeId={result.youtubeId} volume={volume} controls={true} />

        <Button onClick={onClick}>Add</Button>

        <Button onClick={closeModal}>Close</Button>
      </Modal>
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
  const { error, results, resultIndex, setQuery, setResults } = useResultsContext()
  const { playlistRecords } = usePlaylistRecordContext()
  const { currentRecord } = useCurrentRecordContext()
  const resultsRef = createRef<HTMLUListElement>()
  const selectedRef = createRef<HTMLDivElement>()

  const resultItems = results.map((result, idx) => {
    const alreadyAdded =
      !!playlistRecords.find(record => record.song.id === result.id) || currentRecord?.song.id === result.id
    const nowPlaying = currentRecord?.song.id === result.id

    if (idx === resultIndex) {
      return (
        <Box key={result.id} ref={selectedRef}>
          <SearchResult result={result} nowPlaying={nowPlaying} selected={true} alreadyAdded={alreadyAdded} />
        </Box>
      )
    }

    return (
      <SearchResult
        key={result.id}
        nowPlaying={nowPlaying}
        result={result}
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
