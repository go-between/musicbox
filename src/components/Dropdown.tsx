import React, { useState } from 'react'
import { Box } from 'rebass'

type Props = {
  openDropdown: boolean
  toggleDropdown: (ev?: React.MouseEvent) => void
}
export const Dropdown: React.FC<Props> = ({ children, openDropdown, toggleDropdown }) => {
  // const preventBubble = (ev: React.MouseEvent): void => ev.stopPropagation()
  const [isShowing, setIsShowing] = useState<boolean>(true)

  if (!openDropdown) return <></>
  return (
    <Box>
      {children}
    </Box>
  )
}
