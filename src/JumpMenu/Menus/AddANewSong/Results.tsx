import React from 'react'
import { Button, Flex } from 'rebass'
import { useToasts } from 'react-toast-notifications'

import { useAddRecordContext, useUserContext } from 'Context'
import { KeyboardSelectable } from 'components'

import { useJumpNavigationContext } from 'JumpMenu/JumpNavigationContextProvider'
import { useInputContext } from 'JumpMenu/InputContextProvider'
import { Result as ResultType } from './deserialize'
import Result from './Result'

const Results: React.FC<{ results: ResultType[] }> = ({ results }) => {
  const { addToast } = useToasts()
  const { addRecords, addSong } = useAddRecordContext()
  const { setYoutubePreviewId } = useInputContext()
  const { forward } = useJumpNavigationContext()
  const user = useUserContext()

  const inRoom = !!user.activeRoom

  const addOnly = (record: ResultType) => (): void => {
    addSong(record.id, song => {
      addToast(`Successfully added ${song.name} to your library.`, { appearance: 'success', autoDismiss: true })
    })
  }

  const addAndEnqueue = (record: ResultType) => (): void => {
    addSong(record.id, song => {
      addRecords(song.id)
      addToast(`Successfully added ${song.name} to your library.`, { appearance: 'success', autoDismiss: true })
    })
  }

  const resultItems = results.map(r => {
    return (
      <Flex key={r.id} sx={{ flexDirection: 'column' }}>
        <Flex>
          <Result result={r} />
        </Flex>
        <Flex p={2} sx={{ justifyContent: 'space-between' }}>
          <Button
            onClick={addOnly(r)}
            sx={{
              mx: 1,
            }}
          >
            Add to Library
          </Button>

          {inRoom && (
            <Button
              onClick={addAndEnqueue(r)}
              sx={{
                mx: 1,
              }}
            >
              Add and Enqueue
            </Button>
          )}
        </Flex>
      </Flex>
    )
  })

  const keyHandler = {
    a: (i: number) => addOnly(results[i]),
    A: (i: number) => inRoom && addAndEnqueue(results[i]),
    p: (i: number) => {
      setYoutubePreviewId(results[i].youtubeId)
      forward('youtubePreview')
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
    </>
  )
}

export default Results
