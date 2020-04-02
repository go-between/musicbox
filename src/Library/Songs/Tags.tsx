import React from 'react'
import { Box, Button, Flex } from 'rebass'
import { Select } from '@rebass/forms'

import { useTagsContext } from '../TagsContextProvider'

const Tags: React.FC = () => {
  const { activeTag, modifyTags, setActiveTag, setModifyTags, tags } = useTagsContext()
  const selectTag = (ev: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedTag = tags.find(t => t.id === ev.target.value) || null
    setActiveTag(selectedTag)
  }
  const toggleModifyTags = (): void => setModifyTags(!modifyTags)

  return (
    <Flex alignItems="center" justifyContent="space-between" py={2}>
      <Flex alignItems="center">
        <Box mr={2}>Tag songs with:</Box>
        <Box mr={2}>
          <Select
            disabled={modifyTags}
            placeholder="Select a Tag"
            sx={{ bg: 'background', borderRadius: 4, borderColor: 'transparent', minWidth: '160px' }}
            onChange={selectTag}
          >
            <option key="no-tag" value="">
              Select Tag
            </option>
            {tags.map(t => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </Select>
        </Box>
        <Box>
          <Button
            sx={{
              '&:disabled': {
                pointerEvents: 'none',
              },
            }}
            disabled={!activeTag}
            onClick={toggleModifyTags}
          >
            {modifyTags ? 'Save Tags' : 'Start Tagging'}
          </Button>
        </Box>
      </Flex>
      <Box>
        <Button>New Tag</Button>
      </Box>
    </Flex>
  )
}

export default Tags
