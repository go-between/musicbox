import React from 'react'
import { Button, Flex } from 'rebass'

import { useJumpNavigationContext } from './JumpNavigationContextProvider'
import { useInputContext } from './InputContextProvider'

import AddANewSong from './Menus/AddANewSong'
import AllTags from './Menus/AllTags'
import FindInLibrary from './Menus/FindInLibrary'
import Preview from './Menus/Preview'
import Home from './Menus/Home'
import KeyboardShortcuts from './Menus/KeyboardShortcuts'

const Main: React.FC = () => {
  const { back, history, hide } = useJumpNavigationContext()
  const { clear } = useInputContext()

  const selectedMenu = history[0]

  const Route = {
    allTags: AllTags,
    externalSearch: AddANewSong,
    home: Home,
    keyboardShortcuts: KeyboardShortcuts,
    musicboxSearch: FindInLibrary,
    taggedWith: FindInLibrary,
    youtubePreview: Preview,
  }[selectedMenu]

  const close = (): void => {
    clear()
    hide()
  }
  return (
    <>
      <Route />
      <Flex alignItems="center" justifyContent="space-between" flexDirection="row-reverse" my={2}>
        <Button onClick={close}>Close</Button>
        {selectedMenu !== 'home' && <Button onClick={back}>Back</Button>}
      </Flex>
    </>
  )
}

export default Main
