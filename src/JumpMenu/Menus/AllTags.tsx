import React from 'react'
import { Box, Flex, Heading } from 'rebass'
import { Tag } from 'react-feather'

import { KeyboardSelectable } from 'components'

import { useInputContext } from '../InputContextProvider'
import { useJumpNavigationContext } from '../JumpNavigationContextProvider'

const TagItem: React.FC<{ callback: () => void; title: string }> = ({ callback, title }) => {
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
      <Tag size={16} />
      <Box mx={1} />
      {title}
    </Flex>
  )
}

const AllTags: React.FC = () => {
  const { tags, setSelectedTag } = useInputContext()
  const { forward } = useJumpNavigationContext()

  const tagItems = tags.map(t => {
    return {
      callback: (): void => {
        setSelectedTag(t)
        forward('taggedWith')
      },
      id: t.id,
      title: t.name,
    }
  })
  const keyHandler = {
    Enter: (i: number) => tagItems[i].callback(),
  }
  return (
    <>
      <Heading>All tags</Heading>
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
        {tagItems.map(ti => (
          <TagItem key={ti.id} callback={ti.callback} title={ti.title} />
        ))}
      </KeyboardSelectable>
    </>
  )
}

export default AllTags
