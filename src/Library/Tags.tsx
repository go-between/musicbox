import React, { useState } from 'react'
import { Box, Button, Heading, Flex } from 'rebass'
import { Input } from '@rebass/forms'

import { setString } from 'lib/setters'

import { Tag as TagType } from './graphql'
import { useTagsContext } from './TagsContextProvider'

type TagProps = {
  active: boolean
  setActiveTag: (tag: string) => void
  tag: TagType
}
const Tag: React.FC<TagProps> = ({ active, setActiveTag, tag }) => {
  const activate = (): void => {
    if (!active) {
      setActiveTag(tag.id)
    }
  }

  return (
    <Box
      onClick={activate}
      sx={{
        mb: 2,
        cursor: active ? 'default' : 'pointer',
        bg: active ? 'accent' : 'inherit',
      }}
    >
      {tag.name}
    </Box>
  )
}

const TagCreate: React.FC<{ tagCreate: (id: string) => void }> = ({ tagCreate }) => {
  const [newTag, setNewTag] = useState('')

  const clickCreateTag = (): void => {
    if (!newTag) {
      return
    }

    tagCreate(newTag)
    setNewTag('')
  }

  return (
    <>
      <Input
        type="text"
        value={newTag}
        onChange={setString(setNewTag)}
        placeholder="Create a new tag"
        sx={{
          bg: 'accent',
          boxShadow: 'none',
          mr: 1,
        }}
      />
      <Button onClick={clickCreateTag} fontSize={2} width="30%">
        Create
      </Button>
    </>
  )
}
const Tags: React.FC = () => {
  const { activeTag, setActiveTag, tagCreate, tags } = useTagsContext()

  return (
    <Flex
      as="aside"
      sx={{
        borderLeft: '1px solid',
        borderColor: 'accent',
        color: 'text',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'scroll',
        p: 4,
        width: ['100%', '30%'],
      }}
    >
      <Heading mb={4}>Your Tags</Heading>
      <Flex flexDirection="row" justifyContent="space-between" mb={4}>
        <TagCreate tagCreate={tagCreate} />
      </Flex>
      <Box>
        {tags.map(tag => (
          <Tag key={tag.id} active={tag.id === activeTag} setActiveTag={setActiveTag} tag={tag} />
        ))}
      </Box>
    </Flex>
  )
}

export default Tags
