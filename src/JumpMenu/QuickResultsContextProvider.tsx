import React, { createContext, useContext, useState } from 'react'

export type Menus = 'home' | 'musicbox-search' | 'all-tags' | 'tagged-with' | 'youtube-preview' | 'keyboard-shortcuts'
type QuickResultsContext = {
  back: () => void
  forward: (menu: Menus) => void
  home: () => void
  menuHistory: Menus[]
}
const QuickResultsContext = createContext<Partial<QuickResultsContext>>({})

export const QuickResultsContextProvider: React.FC = ({ children }) => {
  const [menuHistory, setMenuHistory] = useState<Menus[]>(['home'])
  const back = (): void => {
    if (menuHistory.length === 1) {
      return
    }
    setMenuHistory(menuHistory.slice(1))
  }
  const forward = (menu: Menus): void => {
    if (menu === menuHistory[0]) {
      return
    }

    setMenuHistory([menu, ...menuHistory])
  }
  const home = (): void => {
    setMenuHistory(['home'])
  }

  return (
    <QuickResultsContext.Provider value={{ back, forward, home, menuHistory }}>{children}</QuickResultsContext.Provider>
  )
}

export const useQuickResultsContext = (): QuickResultsContext => {
  const { back, forward, home, menuHistory } = useContext(QuickResultsContext)

  if (back === undefined || forward === undefined || home === undefined || menuHistory === undefined) {
    throw new Error('QuickResultsContext has been accessed outside of its provider')
  }

  return {
    back,
    forward,
    home,
    menuHistory,
  }
}
