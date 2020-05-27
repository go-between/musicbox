import React, { useCallback, useEffect } from 'react'
import { Box } from 'rebass'
import { Modal } from 'components'

import { InputContextProvider } from './InputContextProvider'
import { useJumpNavigationContext } from './JumpNavigationContextProvider'
import Main from './Main'

const JumpMenu: React.FC = () => {
  const { back, hide, isOpen } = useJumpNavigationContext()

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

      if (ev.key === 'ArrowLeft') {
        back()
      }
    },
    [back],
  )

  useEffect(() => {
    window.addEventListener('keydown', shortcutHandler)

    return () => window.removeEventListener('keydown', shortcutHandler)
  }, [shortcutHandler])

  return (
    <InputContextProvider>
      <Modal showModal={isOpen} closeModal={hide}>
        <Box
          sx={{
            position: 'relative',
            borderRadius: 6,
          }}
          width="100%"
          px={3}
          py={2}
        >
          <Main />
        </Box>
      </Modal>
    </InputContextProvider>
  )
}

export default JumpMenu
