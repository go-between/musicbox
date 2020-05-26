import React, { useCallback, useEffect } from 'react'
import { Flex, Button } from 'rebass'
import { Input } from '@rebass/forms'
import { useToasts } from 'react-toast-notifications'

import { useAddRecordContext } from 'Context'
import { setString } from 'lib/setters'

import { useInputContext } from './InputContextProvider'
import { useQuickResultsContext } from './QuickResultsContextProvider'

const extractYoutubeId = (urlString: string): string | null => {
  try {
    const url = new URL(urlString)
    if (url.hostname === 'youtube.com' || url.hostname === 'www.youtube.com') {
      return url.searchParams.get('v')
    }

    return null
  } catch (TypeError) {
    return null
  }
}

const JumpInput: React.FC = () => {
  const { input, setInput, selectedTag } = useInputContext()
  const { back, menuHistory } = useQuickResultsContext()
  const { addRecords, addSong } = useAddRecordContext()
  const { addToast } = useToasts()

  const shortcutHandler = useCallback(
    (ev: KeyboardEvent): void => {
      if (ev.altKey || ev.shiftKey || ev.metaKey || ev.ctrlKey) {
        return
      }

      const target = ev?.target as HTMLElement
      const fromEditableField = !!['TEXTAREA', 'INPUT', 'SELECT'].find(f => f === target?.tagName)
      if (fromEditableField) {
        return
      }

      if (ev.key === 'b') {
        back()
      }
    },
    [back],
  )

  useEffect(() => {
    window.addEventListener('keydown', shortcutHandler)

    return () => window.removeEventListener('keydown', shortcutHandler)
  }, [shortcutHandler])

  useEffect(() => {
    if (input.length === 0) {
      return
    }

    const youtubeId = extractYoutubeId(input)
    if (youtubeId !== null) {
      setInput('')
      addSong(youtubeId, song => {
        addRecords(song.id)
        addToast(`Successfully added ${song.name}`, { appearance: 'success', autoDismiss: true })
      })
    }
  }, [addRecords, addSong, addToast, input, setInput])

  if (menuHistory[0] !== 'home') {
    const textOptions: { [k: string]: string } = {
      'musicbox-search': `Searching for "${input}"`,
      'all-tags': 'Showing all tags',
      'tagged-with': `Showing songs for ${selectedTag?.name}`,
      'youtube-preview': 'Video preview',
    }
    const backText = textOptions[menuHistory[0]]

    return (
      <Flex alignItems="center" justifyContent="space-between">
        {backText}
        <Button onClick={back}>Back</Button>
      </Flex>
    )
  }

  return (
    <Input
      autoFocus={true}
      type="text"
      value={input}
      onChange={setString(setInput)}
      placeholder="Type to search, or paste YouTube URL"
      sx={{
        boxShadow: 'none',
      }}
    />
  )
}

export default JumpInput
