import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Box, Flex, Text } from 'rebass'
import { Checkbox, Label } from '@rebass/forms'
import { useLazyQuery } from '@apollo/react-hooks'
import { useDebounce } from 'use-debounce'

import { Table, TableWrapper, Tbody, Thead, Tr, Td, Th, MediaObject } from 'components'

import { useSearchContext } from '../SearchContextProvider'
import { useTagsContext } from '../TagsContextProvider'
import { SongsQuery, Song as SongType, SONGS_QUERY } from '../graphql'
import { duration } from 'lib/formatters'

type ResultProps = {
  result: SongType
}
const Result: React.FC<ResultProps> = ({ result }) => {
  const { activeTag, addSong, removeSong, modifyTags, songsToAdd, songsToRemove } = useTagsContext()
  const { activeSongId, setActiveSongId } = useSearchContext()

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

  const songDuration = moment.duration(result.durationInSeconds, 'seconds')

  return (
    <Tr>
      <Td>
        <Label sx={{ m: 0 }}>
          <Checkbox checked={checked} onChange={toggleTag} sx={{ cursor: 'pointer' }} />
        </Label>
      </Td>

      <Td data-label="Song">
        <Flex alignItems="center">
          <Box sx={{
            backgroundImage: `url(${result.thumbnailUrl})`,
            backgroundSize: 'cover',
            borderRadius: 6,
            p: '24px',
            mr: 3,
          }}/>

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
        </Flex>
      </Td>

      <Td data-label="Duration">{duration(songDuration)}</Td>

      <Td data-label="Actions">Edit / Etc.</Td>
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
            <Th>Select</Th>
            <Th>Song</Th>
            <Th>Duration</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>{resultItems}</Tbody>
      </Table>
    </TableWrapper>
  )
}

export default Songs
