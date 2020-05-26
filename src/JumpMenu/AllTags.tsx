import React from 'react'
import { Box, Flex } from 'rebass'
import { Tag } from 'react-feather'

import { KeyboardSelectable } from 'components'

import { useInputContext } from './InputContextProvider'
import { useQuickResultsContext } from './QuickResultsContextProvider'

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
  const { forward } = useQuickResultsContext()

  const tagItems = tags.map(t => {
    return {
      callback: (): void => {
        setSelectedTag(t)
        forward('tagged-with')
      },
      id: t.id,
      title: t.name,
    }
  })
  const keyHandler = {
    Enter: (i: number) => tagItems[i].callback(),
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
      {tagItems.map(ti => (
        <TagItem key={ti.id} callback={ti.callback} title={ti.title} />
      ))}
    </KeyboardSelectable>
  )
}

export default AllTags
