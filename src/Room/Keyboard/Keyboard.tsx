import React, { useCallback, useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Box, Flex } from 'rebass'
import { useToasts } from 'react-toast-notifications'
import { Command } from 'react-feather'

import { useCurrentRecordContext } from 'Context'

import { useApprovalContext } from 'Approval'
import { SongCreateMutation, SONG_CREATE } from './graphql'
import { useJumpMenuContext } from 'JumpMenu'

const Keyboard: React.FC = () => {
  const [showHelp, setShowHelp] = useState(false)
  const toggleShowHelp = (): void => setShowHelp(!showHelp)

  const { addToast } = useToasts()
  const [createSong] = useMutation<SongCreateMutation['data'], SongCreateMutation['vars']>(SONG_CREATE, {
    onCompleted: ({ songCreate: { song } }) => {
      addToast(`Successfully added ${song.name} to your library`, { appearance: 'success', autoDismiss: true })
    },
  })

  const { currentRecord } = useCurrentRecordContext()
  const { incrementApproval } = useApprovalContext()
  const { show } = useJumpMenuContext()

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
        case 'a':
          if (!currentRecord) {
            return
          }

          createSong({ variables: { youtubeId: currentRecord.song.youtubeId, fromUserId: currentRecord.user.id } })
          return
        case 'j':
          show()
          return
        case 'p':
          incrementApproval()
          return
      }
    },
    [currentRecord, createSong, show, incrementApproval],
  )

  useEffect(() => {
    window.addEventListener('keydown', shortcutHandler)

    return () => window.removeEventListener('keydown', shortcutHandler)
  }, [shortcutHandler])

  return (
    <Flex
      onClick={toggleShowHelp}
      sx={{
        alignItems: 'center',
        color: 'text',
        cursor: 'pointer',
        display: 'flex',
        fontSize: 2,
        mb: 3,
        position: 'relative',
        textDecoration: 'none',
        '&:hover > *': {
          visibility: 'visible',
        },
      }}
    >
      <Box
        as="ul"
        sx={{
          bg: 'black',
          borderRadius: 6,
          border: '1px solid',
          borderColor: 'gray700',
          boxShadow: 'xxl',
          bottom: '150%',
          cursor: 'text',
          fontSize: 0,
          left: '50%',
          listStyleType: 'none',
          ml: '-120px',
          p: 2,
          position: 'absolute',
          textAlign: 'left',
          visibility: showHelp ? 'visible' : 'hidden',
          width: '240px',
          zIndex: 100,
        }}
      >
        <Box as="li">
          Add current song to library: <b>A</b>
        </Box>
        <Box as="li">
          Open Jump Menu: <b>J</b>
        </Box>
        <Box as="li">
          Increase song approval: <b>P</b>
        </Box>
      </Box>
      <Box as={Command} size={20} color="muted" />
      <Box mr={2} />
      Keyboard Shortcuts
    </Flex>
  )
}

export default Keyboard
