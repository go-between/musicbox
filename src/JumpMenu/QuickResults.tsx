import React from 'react'
import { Box, Flex } from 'rebass'
import { Search, Tag, Props as IconProps, Command } from 'react-feather'

import { KeyboardSelectable } from 'components'

import { useQuickResultsContext } from './QuickResultsContextProvider'

type QuickResultProps = {
  callback: () => void
  Icon: React.ComponentType<IconProps>
  title: string
}
const QuickResult: React.FC<QuickResultProps> = ({ callback, Icon, title }) => {
  return (
    <Flex
      as="li"
      onClick={callback}
      sx={{
        alignItems: 'center',
        borderRadius: 3,
        cursor: 'pointer',
        listStyle: 'none',
        p: 2,
        width: '100%',
      }}
    >
      <Icon size={16} />
      <Box mx={1} />
      {title}
    </Flex>
  )
}

const QuickResults: React.FC = () => {
  const { forward } = useQuickResultsContext()
  const selectMusicSearch = (): void => forward('musicbox-search')
  const selectAllTags = (): void => forward('all-tags')
  const viewKeyboardShortcuts = (): void => forward('keyboard-shortcuts')

  const quickResults: QuickResultProps[] = [
    {
      callback: selectMusicSearch,
      Icon: Search,
      title: 'Search',
    },
    {
      callback: selectAllTags,
      Icon: Tag,
      title: 'Browse tags',
    },
    {
      callback: viewKeyboardShortcuts,
      Icon: Command,
      title: 'View Keyboard Shortcuts',
    },
  ]

  const keyHandler = {
    Enter: (i: number) => quickResults[i].callback(),
  }

  return (
    <KeyboardSelectable
      keyHandler={keyHandler}
      as="ul"
      sx={{
        m: 0,
        p: 0,
        height: '300px',
        overflowY: 'scroll',
        position: 'relative',
      }}
    >
      {quickResults.map(qr => (
        <QuickResult key={qr.title} {...qr} />
      ))}
    </KeyboardSelectable>
  )
}

export default QuickResults
