import React, { useCallback, useEffect } from 'react'
import { Box, Flex, Heading } from 'rebass'
import { XCircle } from 'react-feather'

type Props = {
  closeModal: (ev?: React.MouseEvent) => void
  showModal: boolean
  title: string
}

export const Modal: React.FC<Props> = ({ children, closeModal, showModal, title }) => {
  const preventBubble = (ev: React.MouseEvent): void => ev.stopPropagation()

  const escapeKeyPress = useCallback(
    (ev: KeyboardEvent): void => {
      if (ev.key === 'Escape') {
        closeModal()
      }
    },
    [closeModal],
  )

  useEffect(() => {
    window.addEventListener('keydown', escapeKeyPress)

    return () => window.removeEventListener('keydown', escapeKeyPress)
  }, [escapeKeyPress])

  if (!showModal) return <></>
  return (
    <Box
      onClick={closeModal}
      sx={{
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        bg: 'rgba(0, 0, 0, 0.5)',
        visibility: showModal ? 'visible' : 'hidden',
        zIndex: 1000,
      }}
    >
      <Box
        onClick={preventBubble}
        sx={{
          bg: 'accent',
          borderRadius: 6,
          m: 'auto',
          p: 3,
          width: '600px',
        }}
      >
        <Flex
          sx={{
            borderBottom: '2px solid',
            borderColor: 'muted',
            pb: 3,
          }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading>{title}</Heading>
          <Box onClick={closeModal} sx={{ cursor: 'pointer' }}>
            <XCircle />
          </Box>
        </Flex>

        {children}
      </Box>
    </Box>
  )
}
