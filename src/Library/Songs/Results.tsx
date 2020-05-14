import React, { useEffect, useState } from 'react'
import { Box, Flex, Text } from 'rebass'
import { Checkbox, Label } from '@rebass/forms'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { useDebounce } from 'use-debounce'
import moment from 'moment'

import { MediaObject, Table, TableWrapper, Tbody, Thead, Tr, Td, Th } from 'components'

import { useSearchContext } from '../SearchContextProvider'
import { useTagsContext } from '../TagsContextProvider'
import {
  LibraryRecordsQuery,
  LIBRARY_RECORDS_QUERY,
  RemoveFromLibrary,
  REMOVE_FROM_LIBRARY,
  LibraryRecord,
} from '../graphql'
import { duration } from 'lib/formatters'

/* eslint-disable @typescript-eslint/camelcase */
const sourceMap: { [k: string]: string } = {
  saved_from_history: 'Added from room',
  accepted_recommendation: 'Accepted',
}
/* eslint-enable @typescript-eslint/camelcase */

const SourceDetails: React.FC<{ libraryRecord: LibraryRecord }> = ({ libraryRecord }) => {
  if (libraryRecord.fromUser === null) {
    return <Box>User Added!</Box>
  }

  return (
    <>
      <Box>{libraryRecord.fromUser?.name}</Box>
      <Box>{sourceMap[libraryRecord.source]}</Box>
    </>
  )
}

type ResultProps = {
  result: LibraryRecord
}

const Result: React.FC<ResultProps> = ({ result }) => {
  const { activeTag, addTagToRecord, removeTagFromRecord, modifyTags, recordsToAdd, recordsToRemove } = useTagsContext()
  const { setActiveSongId } = useSearchContext()

  const [removeFromLibraryMutation] = useMutation<RemoveFromLibrary['data'], RemoveFromLibrary['vars']>(
    REMOVE_FROM_LIBRARY,
    {
      refetchQueries: ['LibraryLibraryRecordsQuery'],
    },
  )

  const removeFromLibrary = (): void => {
    removeFromLibraryMutation({ variables: { id: result.id } })
  }

  const selectSong = (): void => setActiveSongId(result.id)

  const toggleTag = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    if (ev.target.checked) {
      addTagToRecord(result.id)
    } else {
      removeTagFromRecord(result.id)
    }
  }

  const existingTag = !!result.tags.find(t => t.id === activeTag?.id)
  const checked =
    (existingTag && !recordsToRemove.find(r => r === result.id)) ||
    (!existingTag && !!recordsToAdd.find(r => r === result.id))

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
          <MediaObject imageUrl={result.song.thumbnailUrl} imageSize={['24px', '50px']} alignment="center">
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
                {result.song.name}
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
              },
            }}
          >
            {songTags}
          </Box>
        </Box>
      </Td>

      <Td data-label="Source">
        <SourceDetails libraryRecord={result} />
      </Td>
      <Td data-label="Date Added">{moment(result.createdAt).format('L')}</Td>
      <Td data-label="Duration">{duration(result.song.durationInSeconds)}</Td>

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
  const [results, setResults] = useState<LibraryRecord[]>([])
  const [searchLibrary, { data }] = useLazyQuery<LibraryRecordsQuery['data'], LibraryRecordsQuery['vars']>(
    LIBRARY_RECORDS_QUERY,
    {
      fetchPolicy: 'network-only',
    },
  )

  useEffect(() => {
    if (!data) {
      return
    }

    setResults(data.libraryRecords)
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
            <Th>Tags</Th>
            <Th>Source</Th>
            <Th>Date Added</Th>
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
