import React from 'react'
import { Box, Flex } from 'rebass'
import { Search, Tag, Props as IconProps, Command } from 'react-feather'
import { Input } from '@rebass/forms'

import { setString } from 'lib/setters'
import { KeyboardSelectable } from 'components'

import { useJumpNavigationContext } from '../JumpNavigationContextProvider'
import { useInputContext } from '../InputContextProvider'

type MenuItemProps = {
  callback: () => void
  Icon: React.ComponentType<IconProps>
  title: string
}
const MenuItem: React.FC<MenuItemProps> = ({ callback, Icon, title }) => {
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

const Home: React.FC = () => {
  const { forward } = useJumpNavigationContext()
  const { input, setInput } = useInputContext()
  const selectMusicSearch = (): void => forward('musicboxSearch')
  const selectAllTags = (): void => forward('allTags')
  const viewKeyboardShortcuts = (): void => forward('keyboardShortcuts')

  const menuItems: MenuItemProps[] = [
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
    Enter: (i: number) => menuItems[i].callback(),
    ArrowRight: (i: number) => menuItems[i].callback(),
  }

  return (
    <>
      <Input
        autoFocus={true}
        type="text"
        value={input}
        onChange={setString(setInput)}
        placeholder="Type to search, or paste YouTube URL"
        sx={{
          boxShadow: 'none',
        }}
      />
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
        {menuItems.map(qr => (
          <MenuItem key={qr.title} {...qr} />
        ))}
      </KeyboardSelectable>
    </>
  )
}

export default Home
