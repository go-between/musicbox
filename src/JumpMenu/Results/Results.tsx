import React, { useCallback, useState } from 'react'
import { Flex, Button } from 'rebass'
import { Checkbox, Label } from '@rebass/forms'
import { useToasts } from 'react-toast-notifications'

import { useAddRecordContext } from 'Context'
import { KeyboardSelectable } from 'components'

import { useQuickResultsContext } from '../QuickResultsContextProvider'
import { useInputContext } from '../InputContextProvider'
import { Result as ResultType } from './deserialize'
import Result from './Result'

const Results: React.FC<{ results: ResultType[] }> = ({ results }) => {
  const { addToast } = useToasts()
  const [resultsToAdd, setResultsToAdd] = useState<string[]>([])
  const { addRecords } = useAddRecordContext()
  const { setYoutubePreviewId } = useInputContext()
  const { forward } = useQuickResultsContext()

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

  const addSelectedRecords = useCallback((): void => {
    addRecords(...resultsToAdd)
    addToast(`Successfully added ${resultsToAdd.length} songs.`, { appearance: 'success', autoDismiss: true })
    setResultsToAdd([])
  }, [addRecords, addToast, resultsToAdd])

  const resultItems = results.map(r => {
    const checked = !!resultsToAdd.find(rta => rta === r.songId)
    const toggle = (): void => toggleSelection(r.songId)

    return (
      <Flex key={r.id} sx={{ alignItems: 'center' }}>
        <Label sx={{ m: 0, width: 'auto' }}>
          <Checkbox checked={checked} onChange={toggle} sx={{ cursor: 'pointer' }} />
        </Label>
        <Result result={r} />
      </Flex>
    )
  })

  const keyHandler = {
    s: (i: number) => toggleSelection(results[i].songId),
    q: () => addSelectedRecords(),
    p: (i: number) => {
      setYoutubePreviewId(results[i].youtubeId)
      forward('youtube-preview')
    },
  }
  return (
    <>
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
      <Button
        disabled={resultsToAdd.length === 0}
        onClick={addSelectedRecords}
        sx={{ '&:disabled': { pointerEvents: 'none' } }}
      >
        Add All
      </Button>
    </>
  )
}

export default Results
