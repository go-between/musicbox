import React, { createContext, useContext, useState } from 'react'

export type Menus = 'allTags' | 'home' | 'keyboardShortcuts' | 'musicboxSearch' | 'taggedWith' | 'youtubePreview'

type JumpNavigationContext = {
  back: () => void
  forward: (menu: Menus) => void
  history: Menus[]
  hide: () => void
  isOpen: boolean
  show: () => void
}
const JumpNavigationContext = createContext<Partial<JumpNavigationContext>>({})

export const JumpNavigationContextProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [history, setHistory] = useState<Menus[]>(['home'])

  const show = (): void => setIsOpen(true)
  const hide = (): void => {
    setHistory(['home'])
    setIsOpen(false)
  }

  const back = (): void => {
    if (history.length === 1) {
      return
    }
    setHistory(history.slice(1))
  }
  const forward = (menu: Menus): void => {
    if (menu === history[0]) {
      return
    }

    setHistory([menu, ...history])
  }

  return (
    <JumpNavigationContext.Provider
      value={{
        back,
        forward,
        history,
        hide,
        isOpen,
        show,
      }}
    >
      {children}
    </JumpNavigationContext.Provider>
  )
}

export const useJumpNavigationContext = (): JumpNavigationContext => {
  const { back, forward, history, hide, isOpen, show } = useContext(JumpNavigationContext)

  if (
    back === undefined ||
    forward === undefined ||
    history === undefined ||
    hide === undefined ||
    isOpen === undefined ||
    show === undefined
  ) {
    throw new Error('JumpNavigationContext has been accessed outside of its provider')
  }

  return {
    back,
    forward,
    history,
    hide,
    isOpen,
    show,
  }
}
