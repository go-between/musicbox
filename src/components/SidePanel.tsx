import React, { useCallback, useEffect } from 'react'
import { Box, Flex } from 'rebass'
import { XCircle } from 'react-feather'

type Props = {
  closeSidePanel: (ev?: React.MouseEvent) => void
  showSidePanel: boolean
}

export const SidePanel: React.FC<Props> = ({ children, closeSidePanel, showSidePanel }) => {
  const preventBubble = (ev: React.MouseEvent): void => ev.stopPropagation()

  const escapeKeyPress = useCallback(
    (ev: KeyboardEvent): void => {
      if (ev.key === 'Escape') {
        closeSidePanel()
      }
    },
    [closeSidePanel],
  )

  useEffect(() => {
    window.addEventListener('keydown', escapeKeyPress)

    return () => window.removeEventListener('keydown', escapeKeyPress)
  }, [escapeKeyPress])

  if (!showSidePanel) return <></>

  return (
    <Box
      onClick={closeSidePanel}
      sx={{
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        bg: 'rgba(0, 0, 0, 0.5)',
        visibility: showSidePanel ? 'visible' : 'hidden',
        zIndex: 1000,
      }}
    >
      <Box
        onClick={preventBubble}
        sx={{
          bg: 'background',
          border: '1px solid',
          borderColor: 'accent',
          boxShadow: 'xl',
          color: 'text',
          flexDirection: 'column',
          height: '100%',
          overflow: 'scroll',
          p: 4,
          position: 'absolute',
          right: 0,
          width: '400px',
        }}
      >
        <Flex
          sx={{
            pb: 3,
          }}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Box onClick={closeSidePanel} sx={{ cursor: 'pointer' }}>
            <XCircle />
          </Box>
        </Flex>

        {children}
      </Box>
    </Box>
  )
}
