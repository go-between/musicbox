import React from 'react'
import { Box, Flex, Heading } from 'rebass'
import { XCircle } from 'react-feather'

type Props = {
  showModal: boolean
  closeModal: (ev?: React.MouseEvent) => void
  title: string
}
export const Modal: React.FC<Props> = ({ children, closeModal, showModal, title }) => {
  const preventBubble = (ev: React.MouseEvent): void => ev.stopPropagation()
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
        <Flex alignItems="center" justifyContent="space-between" mb={2}>
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
