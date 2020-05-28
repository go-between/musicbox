import React from 'react'
import { Button, Flex } from 'rebass'

import { useJumpNavigationContext } from './JumpNavigationContextProvider'
import { useInputContext } from './InputContextProvider'

import AllTags from './Menus/AllTags'
import RecordsSearch from './Menus/RecordsSearch'
import Preview from './Menus/Preview'
import Home from './Menus/Home'
import RecordsByTag from './Menus/RecordsByTag'
import KeyboardShortcuts from './Menus/KeyboardShortcuts'

const Main: React.FC = () => {
  const { back, history, hide } = useJumpNavigationContext()
  const { clear } = useInputContext()

  const selectedMenu = history[0]

  const Route = {
    allTags: AllTags,
    home: Home,
    keyboardShortcuts: KeyboardShortcuts,
    musicboxSearch: RecordsSearch,
    taggedWith: RecordsByTag,
    youtubePreview: Preview,
  }[selectedMenu]

  const close = (): void => {
    clear()
    hide()
  }
  return (
    <>
      <Route />
      <Flex alignItems="center" justifyContent="space-between" flexDirection="row-reverse">
        <Button onClick={close}>Close</Button>
        {selectedMenu !== 'home' && <Button onClick={back}>Back</Button>}
      </Flex>
    </>
  )
}

export default Main
