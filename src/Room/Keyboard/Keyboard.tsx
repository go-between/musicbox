import React, { useCallback, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useToasts } from 'react-toast-notifications'

import { useCurrentRecordContext } from 'Context'

import { useApprovalContext } from 'Approval'
import { SongCreateMutation, SONG_CREATE } from './graphql'
import { useJumpNavigationContext } from 'JumpMenu'
import { useVolumeContext } from 'Player'

const Keyboard: React.FC = () => {
  const { addToast } = useToasts()
  const [createSong] = useMutation<SongCreateMutation['data'], SongCreateMutation['vars']>(SONG_CREATE, {
    onCompleted: ({ songCreate: { song } }) => {
      addToast(`Successfully added ${song.name} to your library`, { appearance: 'success', autoDismiss: true })
    },
  })

  const { currentRecord } = useCurrentRecordContext()
  const { incrementApproval } = useApprovalContext()
  const { show, forward } = useJumpNavigationContext()
  const { toggleMute } = useVolumeContext()

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

      ev.preventDefault()
      switch (ev.key) {
        case 't':
          if (!currentRecord) {
            return
          }

          createSong({ variables: { youtubeId: currentRecord.song.youtubeId, fromUserId: currentRecord.user.id } })
          return
        case 'j':
          show()
          return
        case 'k':
          forward('keyboardShortcuts')
          show()
          return
        case 'm':
          toggleMute()
          return
        case 'u':
          incrementApproval()
          return
      }
    },
    [currentRecord, createSong, show, forward, incrementApproval, toggleMute],
  )

  useEffect(() => {
    window.addEventListener('keydown', shortcutHandler)

    return () => window.removeEventListener('keydown', shortcutHandler)
  }, [shortcutHandler])

  return <></>
}

export default Keyboard
