import React, { createContext, useContext, useState } from 'react'

type JumpMenuContext = {
  hide: () => void
  isOpen: boolean
  show: () => void
}
const JumpMenuContext = createContext<Partial<JumpMenuContext>>({})

export const JumpMenuContextProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const show = (): void => setIsOpen(true)
  const hide = (): void => setIsOpen(false)

  return <JumpMenuContext.Provider value={{ hide, isOpen, show }}>{children}</JumpMenuContext.Provider>
}

export const useJumpMenuContext = (): JumpMenuContext => {
  const { hide, isOpen, show } = useContext(JumpMenuContext)

  if (hide === undefined || isOpen === undefined || show === undefined) {
    throw new Error('JumpMenuContext has been accessed outside of its provider')
  }

  return {
    hide,
    isOpen,
    show,
  }
}
