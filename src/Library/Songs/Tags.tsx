import React, { useState } from 'react'
import { Box, Button, Flex } from 'rebass'
import { Input } from '@rebass/forms'
import { useMutation } from '@apollo/react-hooks'
import { Select } from '@rebass/forms'
import { useToasts } from 'react-toast-notifications'

import { Modal } from 'components'
import { setString } from 'lib/setters'

import { TagCreate, TAG_CREATE } from '../graphql'
import { useTagsContext } from '../TagsContextProvider'

type CreateTagProps = {
  closeModal: () => void
}
const CreateTag: React.FC<CreateTagProps> = ({ closeModal }) => {
  const [tagName, setTagName] = useState('')
  const { addToast } = useToasts()
  const [tagCreateMutation] = useMutation<TagCreate['vars'], TagCreate['data']>(TAG_CREATE, {
    refetchQueries: ['Tags'],
    onCompleted: (): void => {
      addToast(`Successfully created tag ${tagName}`, {
        appearance: 'success',
        autoDismiss: true,
      })
      setTagName('')
      closeModal()
    },
  })
  const createTag = (): void => {
    tagCreateMutation({ variables: { name: tagName } })
  }

  return (
    <Box sx={{ textAlign: 'right' }}>
      <Input onChange={setString(setTagName)} value={tagName} mb={2} />
      <Button onClick={createTag} disabled={!tagName} sx={{ '&:disabled': { pointerEvents: 'none' } }}>
        Create
      </Button>
    </Box>
  )
}

const Tags: React.FC = () => {
  const { activeTag, modifyTags, setActiveTag, setModifyTags, tags } = useTagsContext()
  const selectTag = (ev: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedTag = tags.find(t => t.id === ev.target.value) || null
    setActiveTag(selectedTag)
  }
  const toggleModifyTags = (): void => setModifyTags(!modifyTags)
  const [showModal, setShowModal] = useState(false)
  const openModal = (): void => setShowModal(true)
  const closeModal = (): void => setShowModal(false)

  return (
    <>
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
          <Button onClick={openModal}>New Tag</Button>
        </Box>
      </Flex>
      <Modal showModal={showModal} closeModal={closeModal} title="Create Tag">
        <CreateTag closeModal={closeModal} />
      </Modal>
    </>
  )
}

export default Tags
