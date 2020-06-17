import React, { useCallback, useState } from 'react'
import { Box, Flex, Button } from 'rebass'
import { Checkbox, Label } from '@rebass/forms'
import { useToasts } from 'react-toast-notifications'
import { Check, Plus } from 'react-feather'

import { useAddRecordContext, usePlaylistRecordsContext, useUserContext } from 'Context'
import { KeyboardSelectable } from 'components'
import { shuffle } from 'lib/array'

import { useJumpNavigationContext } from 'JumpMenu/JumpNavigationContextProvider'
import { useInputContext } from 'JumpMenu/InputContextProvider'
import { LibraryRecord } from './graphql'
import Result from './Result'

const Results: React.FC<{ results: LibraryRecord[] }> = ({ results }) => {
  const [resultsToAdd, setResultsToAdd] = useState<string[]>([])
  const [allSelected, setAllSelected] = useState(false)

  const { addToast } = useToasts()
  const { addRecords } = useAddRecordContext()
  const { setYoutubePreviewId } = useInputContext()
  const { forward } = useJumpNavigationContext()
  const { playlistRecords } = usePlaylistRecordsContext()
  const user = useUserContext()

  const inRoom = !!user.activeRoom

  const toggleSelection = useCallback(
    (songId: string): void => {
      const isAdded = !!resultsToAdd.find(rta => rta === songId)
      if (isAdded) {
        setResultsToAdd(resultsToAdd.filter(rta => rta !== songId))
      } else {
        setResultsToAdd([...resultsToAdd, songId])
      }
    },
    [resultsToAdd],
  )

  const addSelectedRecords = useCallback(
    (shuffleResults = false): void => {
      const records = shuffleResults ? shuffle(resultsToAdd) : resultsToAdd
      addRecords(...records)
      addToast(`Successfully added ${records.length} songs.`, { appearance: 'success', autoDismiss: true })
      setResultsToAdd([])
      setAllSelected(false)
    },
    [addRecords, addToast, resultsToAdd],
  )

  const resultItems = results.map(r => {
    const checked = !!resultsToAdd.find(rta => rta === r.song.id)
    const toggle = (): void => toggleSelection(r.song.id)
    const isEnqueued = !!playlistRecords.find(plr => plr.song.id === r.song.id)

    return (
      <Flex key={r.id} sx={{ alignItems: 'center' }}>
        {inRoom && (
          <Label sx={{ m: 0, width: 'auto' }}>
            <Checkbox checked={checked} onChange={toggle} sx={{ cursor: 'pointer' }} />
          </Label>
        )}

        <Result result={r} />

        {inRoom && (
          <Box
            onClick={() => addRecords(r.song.id)}
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
            {isEnqueued ? <Check size={18} /> : <Plus size={18} />}
          </Box>
        )}
      </Flex>
    )
  })

  const toggleAllSelected = (): void => {
    if (allSelected) {
      setResultsToAdd([])
      setAllSelected(false)
    } else {
      setResultsToAdd(results.map(r => r.song.id))
      setAllSelected(true)
    }
  }

  const keyHandler = {
    S: () => toggleAllSelected(),
    s: (i: number) => inRoom && toggleSelection(results[i].song.id),
    q: () => inRoom && addSelectedRecords(),
    Q: () => inRoom && addSelectedRecords(true),
    p: (i: number) => {
      setYoutubePreviewId(results[i].song.youtubeId)
      forward('youtubePreview')
    },
  }
  return (
    <>
      {inRoom && (
        <Flex alignItems="center" justifyContent="space-between">
          <Label sx={{ m: 0, width: 'auto', display: 'flex', alignItems: 'center' }}>
            <Checkbox checked={allSelected} onChange={toggleAllSelected} sx={{ cursor: 'pointer' }} />
            All
          </Label>
          <Button
            disabled={resultsToAdd.length === 0}
            onClick={addSelectedRecords}
            sx={{ '&:disabled': { pointerEvents: 'none' } }}
          >
            Add All
          </Button>
        </Flex>
      )}
      <KeyboardSelectable
        keyHandler={keyHandler}
        as="ul"
        sx={{
          m: 0,
          p: 0,
          height: '300px',
          overflowY: 'scroll',
          position: 'relative',
        }}
      >
        {resultItems}
      </KeyboardSelectable>
    </>
  )
}

export default Results
