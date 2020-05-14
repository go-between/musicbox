import React, { createContext, useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { useToasts } from 'react-toast-notifications'

import { Tag, TagCreate, TagToggle, TagsQuery, TAG_CREATE, TAGS_QUERY, TAG_TOGGLE } from './graphql'

type TagsContext = {
  activeTag: Tag | null
  addTagToRecord: (recordId: string) => void
  modifyTags: boolean
  removeTagFromRecord: (recordId: string) => void
  setActiveTag: (tag: Tag | null) => void
  setModifyTags: (modifyTags: boolean) => void
  recordsToAdd: string[]
  recordsToRemove: string[]
  tags: Tag[]
  tagCreate: (name: string) => void
}

const TagsContext = createContext<Partial<TagsContext>>({})
const TagsContextProvider: React.FC = ({ children }) => {
  const [activeTag, setActiveTag] = useState<Tag | null>(null)
  const [tags, setTags] = useState<Tag[]>([])
  const [modifyTags, internalSetModifyTags] = useState(false)
  const [recordsToAdd, setRecordsToAdd] = useState<string[]>([])
  const [recordsToRemove, setRecordsToRemove] = useState<string[]>([])
  const [tagCreateMutation] = useMutation<TagCreate['data'], TagCreate['vars']>(TAG_CREATE)
  const { addToast } = useToasts()

  const [tagToggleMutation] = useMutation<TagToggle['data'], TagToggle['vars']>(TAG_TOGGLE, {
    refetchQueries: ['LibraryLibraryRecordsQuery'],
    onCompleted: (): void => {
      if (recordsToAdd.length > 0) {
        addToast(`Successfully added ${activeTag?.name} to ${recordsToAdd.length} song(s).`, {
          appearance: 'success',
          autoDismiss: true,
        })
      }
      if (recordsToRemove.length > 0) {
        addToast(`Successfully removed ${activeTag?.name} from ${recordsToRemove.length} song(s).`, {
          appearance: 'success',
          autoDismiss: true,
        })
      }

      setRecordsToAdd([])
      setRecordsToRemove([])
    },
  })

  const setModifyTags = (modifyTags: boolean): void => {
    if (!activeTag) {
      return
    }

    if (modifyTags) {
      setRecordsToAdd([])
      setRecordsToRemove([])
    } else {
      tagToggleMutation({ variables: { tagId: activeTag.id, addIds: recordsToAdd, removeIds: recordsToRemove } })
    }
    internalSetModifyTags(modifyTags)
  }

  const addTagToRecord = (recordId: string): void => {
    if (!!recordsToRemove.find(r => r === recordId)) {
      setRecordsToRemove(recordsToRemove.filter(r => r !== recordId))
    } else {
      setRecordsToAdd([...recordsToAdd, recordId])
    }
  }
  const removeTagFromRecord = (recordId: string): void => {
    if (!!recordsToAdd.find(r => r === recordId)) {
      setRecordsToAdd(recordsToAdd.filter(r => r !== recordId))
    } else {
      setRecordsToRemove([...recordsToRemove, recordId])
    }
  }

  const tagCreate = (name: string): void => {
    tagCreateMutation({ variables: { name }, refetchQueries: ['Tags'] })
  }

  const { data: tagData, loading } = useQuery<TagsQuery['data']>(TAGS_QUERY, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (!tagData) {
      return
    }

    setTags(tagData.tags)
  }, [tagData, setTags])

  if (loading) {
    return <></>
  }

  return (
    <TagsContext.Provider
      value={{
        activeTag,
        addTagToRecord,
        modifyTags,
        removeTagFromRecord,
        setActiveTag,
        setModifyTags,
        recordsToAdd,
        recordsToRemove,
        tagCreate,
        tags,
      }}
    >
      {children}
    </TagsContext.Provider>
  )
}

export const useTagsContext: () => TagsContext = () => {
  const {
    activeTag,
    addTagToRecord,
    modifyTags,
    removeTagFromRecord,
    setActiveTag,
    setModifyTags,
    recordsToAdd,
    recordsToRemove,
    tagCreate,
    tags,
  } = useContext(TagsContext)

  if (
    activeTag === undefined ||
    addTagToRecord === undefined ||
    modifyTags === undefined ||
    removeTagFromRecord === undefined ||
    setActiveTag === undefined ||
    setModifyTags === undefined ||
    recordsToAdd === undefined ||
    recordsToRemove === undefined ||
    tagCreate === undefined ||
    tags === undefined
  ) {
    throw new Error('TagsContext accessed before being set')
  }

  return {
    addTagToRecord,
    activeTag,
    modifyTags,
    removeTagFromRecord,
    setActiveTag,
    setModifyTags,
    recordsToAdd,
    recordsToRemove,
    tagCreate,
    tags,
  }
}
export default TagsContextProvider
