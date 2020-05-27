import React from 'react'
import { Box } from 'rebass'
import { Modal } from 'components'

import { useJumpMenuContext } from './JumpMenuContextProvider'
import { useInputContext } from './InputContextProvider'
import { useQuickResultsContext, Menus } from './QuickResultsContextProvider'
import AllTags from './AllTags'
import JumpInput from './JumpInput'
import MusicboxSearch from './MusicboxSearch'
import Preview from './Preview'
import QuickResults from './QuickResults'
import RecordsByTag from './RecordsByTag'
import KeyboardShortcuts from './KeyboardShortcuts'

const JumpMenuRouter: React.FC<{ selectedMenu: Menus }> = ({ selectedMenu }) => {
  const jumpMenuRoutes = {
    'all-tags': AllTags,
    home: QuickResults,
    'musicbox-search': MusicboxSearch,
    'tagged-with': RecordsByTag,
    'youtube-preview': Preview,
    'keyboard-shortcuts': KeyboardShortcuts
  }

  const RouteToRender = jumpMenuRoutes[selectedMenu]
  return <RouteToRender />
}

const JumpMenu: React.FC = () => {
  const { hide, isOpen } = useJumpMenuContext()
  const { setInput } = useInputContext()
  const { menuHistory, home } = useQuickResultsContext()

  const closeJumpMenu = (): void => {
    setInput('')
    home()
    hide()
  }

  return (
    <Modal showModal={isOpen} closeModal={closeJumpMenu}>
      <Box
        sx={{
          position: 'relative',
          borderRadius: 6,
        }}
        width="100%"
        px={3}
        py={2}
      >
        <JumpInput />
        <Box my={2} />
        <JumpMenuRouter selectedMenu={menuHistory[0]} />
      </Box>
    </Modal>
  )
}

export default JumpMenu
