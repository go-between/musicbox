import React, { useCallback, useEffect, useState } from 'react'
import { Box, Flex } from 'rebass'
import { Inbox, Grid, Search, Tag, Props as IconProps, Command, Youtube, Send, Settings } from 'react-feather'
import { Input } from '@rebass/forms'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

import { useAddRecordContext, useUserContext } from 'Context'
import { setString } from 'lib/setters'
import { KeyboardSelectable } from 'components'

import { useJumpNavigationContext } from '../JumpNavigationContextProvider'
import { useInputContext } from '../InputContextProvider'

const extractYoutubeId = (urlString: string): string | null => {
  try {
    const url = new URL(urlString)
    if (url.hostname === 'youtube.com' || url.hostname === 'www.youtube.com') {
      return url.searchParams.get('v')
    }

    return null
  } catch (TypeError) {
    return null
  }
}

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

const menusHaveChanged = (newMenus: MenuItemProps[], previousMenus: MenuItemProps[]): boolean => {
  if (newMenus.length !== previousMenus.length) {
    return true
  }

  return newMenus.reduce<boolean>((acc, newMenu) => {
    return acc || !previousMenus.find(pm => pm.title === newMenu.title)
  }, false)
}

const Home: React.FC = () => {
  const { addRecords, addSong } = useAddRecordContext()
  const { forward, hide } = useJumpNavigationContext()
  const { clear, input, tags, setSelectedTag, setInput } = useInputContext()
  const { push } = useHistory()
  const { addToast } = useToasts()

  const user = useUserContext()

  const initialMenuItems: MenuItemProps[] = [
    {
      callback: () => forward('musicboxSearch'),
      Icon: Search,
      title: 'Search',
    },
    {
      callback: () => forward('allTags'),
      Icon: Tag,
      title: 'Browse tags',
    },
    {
      callback: () => forward('keyboardShortcuts'),
      Icon: Command,
      title: 'View Keyboard Shortcuts',
    },
  ]

  const [menuItems, setMenuItems] = useState<MenuItemProps[]>(initialMenuItems)
  const navigateTo = useCallback(
    (path: string): void => {
      hide()
      clear()
      push(path)
    },
    [clear, hide, push],
  )

  useEffect(() => {
    if (input.length === 0) {
      if (menusHaveChanged(menuItems, initialMenuItems)) {
        setMenuItems([...initialMenuItems])
      }
      return
    }
    const escapedInput = input.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
    const startsWith = new RegExp(`^${escapedInput}`, 'i')
    const includes = new RegExp(escapedInput, 'i')

    const additionalItems: MenuItemProps[] = []
    // To Library
    if ('library'.match(startsWith)) {
      additionalItems.push({
        callback: () => navigateTo('/library'),
        Icon: Inbox,
        title: 'Navigate to Library',
      })
    }

    // To Recommendations
    if ('recommendations'.match(startsWith)) {
      additionalItems.push({
        callback: () => navigateTo('/recommendations'),
        Icon: Send,
        title: 'Navigate to Recommendations',
      })
    }

    // To User Settings
    if ('user settings'.match(startsWith) || 'settings'.match(startsWith)) {
      additionalItems.push({
        callback: () => navigateTo('/user-settings'),
        Icon: Settings,
        title: 'Navigate to User Settings',
      })
    }

    // To Room
    user.activeTeam?.rooms.forEach(room => {
      if (room.name.match(includes)) {
        additionalItems.push({
          callback: () => navigateTo(`/room/${room.id}`),
          Icon: Grid,
          title: `Navigate to ${room.name}`,
        })
      }
    })

    // Add from YouTube
    const youtubeId = extractYoutubeId(input)
    if (youtubeId) {
      additionalItems.push({
        callback: () => {
          setInput('')
          addSong(youtubeId, song => {
            addToast(`Successfully added ${song.name}`, { appearance: 'success', autoDismiss: true })
          })
        },
        Icon: Youtube,
        title: 'Add from YouTube',
      })

      additionalItems.push({
        callback: () => {
          addSong(youtubeId, song => {
            setInput('')
            addRecords(song.id)
            addToast(`Successfully added ${song.name}`, { appearance: 'success', autoDismiss: true })
          })
        },
        Icon: Youtube,
        title: 'Add from YouTube and enqueue',
      })
    }

    // Matching Tag
    tags.forEach(tag => {
      if (tag.name.match(includes)) {
        additionalItems.push({
          callback: () => {
            setSelectedTag(tag)
            forward('taggedWith')
          },
          Icon: Tag,
          title: `View songs tagged ${tag.name}`,
        })
      }
    })

    const newMenuItems = [...additionalItems, ...initialMenuItems]
    if (menusHaveChanged(newMenuItems, menuItems)) {
      setMenuItems([...additionalItems, ...initialMenuItems])
    }
  }, [
    input,
    initialMenuItems,
    menuItems,
    navigateTo,
    user,
    addSong,
    addToast,
    addRecords,
    setInput,
    tags,
    setSelectedTag,
    forward,
  ])

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
        placeholder="Search for a song, a tag, a room, or paste YouTube URL"
        sx={{
          boxShadow: 'none',
          mb: 2,
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
