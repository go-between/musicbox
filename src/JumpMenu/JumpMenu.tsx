import React from 'react'

import { InputContextProvider } from './InputContextProvider'
import { QuickResultsContextProvider } from './QuickResultsContextProvider'
import JumpMain from './JumpMain'

const JumpMenu: React.FC = () => {
  return (
    <InputContextProvider>
      <QuickResultsContextProvider>
        <JumpMain />
      </QuickResultsContextProvider>
    </InputContextProvider>
  )
}

export default JumpMenu
