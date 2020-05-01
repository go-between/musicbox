import React, { useEffect, useState } from 'react'
import { Box, Flex, Text } from 'rebass'
import { Checkbox, Label } from '@rebass/forms'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { useDebounce } from 'use-debounce'

import { MediaObject, Table, TableWrapper, Tbody, Thead, Tr, Td, Th } from 'components'

import { useSearchContext } from '../SearchContextProvider'
import { useTagsContext } from '../TagsContextProvider'
import { SongsQuery, Song as SongType, SONGS_QUERY, RemoveFromLibrary, REMOVE_FROM_LIBRARY } from '../graphql'
import { duration } from 'lib/formatters'

type ResultProps = {
  result: SongType
}
const Result: React.FC<ResultProps> = ({ result }) => {
  const { activeTag, addSong, removeSong, modifyTags, songsToAdd, songsToRemove } = useTagsContext()
  const { setActiveSongId } = useSearchContext()

  const [removeFromLibraryMutation] = useMutation<RemoveFromLibrary['data'], RemoveFromLibrary['vars']>(
    REMOVE_FROM_LIBRARY,
    {
      refetchQueries: ['LibrarySongsQuery'],
    },
  )

  const removeFromLibrary = (): void => {
    removeFromLibraryMutation({ variables: { id: result.id } })
  }

  const selectSong = (): void => setActiveSongId(result.id)

  const toggleTag = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    if (ev.target.checked) {
      addSong(result.id)
    } else {
      removeSong(result.id)
    }
  }

  const existingTag = !!result.tags.find(t => t.id === activeTag?.id)
  const checked =
    (existingTag && !songsToRemove.find(s => s === result.id)) ||
    (!existingTag && !!songsToAdd.find(s => s === result.id))

  const songTags = result.tags.map(tag => (
    <Box
      key={tag.id}
      sx={{
        bg: 'accent',
        borderRadius: 3,
        display: 'inline-block',
        fontSize: 1,
        fontWeight: 600,
        mx: 1,
        p: 1,
      }}
    >
      {tag.name}
    </Box>
  ))

  return (
    <Tr>
      <Td data-label="select">
        <Flex alignItems="center" justifyContent={['flex-end', 'flex-start']}>
          <Label sx={{ m: 0 }}>
            <Checkbox
              checked={checked}
              onChange={toggleTag}
              sx={{ cursor: modifyTags ? 'pointer' : 'auto' }}
              disabled={!modifyTags}
            />
          </Label>
        </Flex>
      </Td>

      <Td data-label="Song">
        <Flex alignItems="center" justifyContent={['flex-end', 'flex-start']}>
          <MediaObject imageUrl={result.thumbnailUrl} imageSize={['24px', '50px']} alignment="center">
            <Box>
              <Text
                sx={{
                  fontSize: 1,
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {result.name}
              </Text>
            </Box>
          </MediaObject>
        </Flex>
      </Td>

      <Td data-label="Tags">
        <Box
          sx={{
            position: 'relative',
            '&:after': {
              content: "' '",
              position: 'absolute',
              zIndex: '1',
              top: '0',
              right: '0',
              bottom: '0',
              pointerEvents: 'none',
              backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0), #1A202C 85%)',
              width: '15%',
            },
          }}
        >
          <Box
            sx={{
              overflow: 'auto',
              position: 'relative',
              whiteSpace: 'nowrap',
              '&::-webkit-scrollbar': {
                display: 'none',
              }
            }}
          >
            {songTags}
          </Box>
        </Box>
      </Td>

      <Td data-label="Duration">{duration(result.durationInSeconds)}</Td>

      <Td data-label="Actions">
        <Flex alignItems="center" justifyContent={['flex-end', 'flex-start']}>
          <Box
            onClick={selectSong}
            sx={{
              cursor: 'pointer',
              color: 'gray400',
              fontSize: 1,
              textAlign: 'center',
              textDecoration: 'underline',
              width: '100%',
            }}
          >
            view
          </Box>

          <Box
            onClick={removeFromLibrary}
            sx={{
              cursor: 'pointer',
              color: 'gray400',
              fontSize: 1,
              textAlign: 'center',
              textDecoration: 'underline',
              width: '100%',
            }}
          >
            remove
          </Box>
        </Flex>
      </Td>
    </Tr>
  )
}

const Songs: React.FC = () => {
  const { query } = useSearchContext()
  const [debouncedQuery] = useDebounce(query, 500)
  const [results, setResults] = useState<SongType[]>([])
  const [searchLibrary, { data }] = useLazyQuery<SongsQuery['data'], SongsQuery['vars']>(SONGS_QUERY, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (!data) {
      return
    }

    setResults(data.songs)
  }, [data, setResults])

  useEffect(() => {
    searchLibrary({ variables: { query: debouncedQuery } })
  }, [debouncedQuery, searchLibrary])

  if (results.length === 0) {
    return <></>
  }

  const resultItems = results.map(result => <Result key={result.id} result={result} />)
  return (
    <TableWrapper>
      <Table>
        <Thead>
          <Tr>
            <Th width={['auto', '10%']}>Select</Th>
            <Th width={['auto', '40%']}>Song</Th>
            <Th width={['auto', '20%']}>Tags</Th>
            <Th width={['auto', '15%']}>Duration</Th>
            <Th width={['auto', '15%']}></Th>
          </Tr>
        </Thead>
        <Tbody>{resultItems}</Tbody>
      </Table>
    </TableWrapper>
  )
}

export default Songs
