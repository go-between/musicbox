import React, { createContext, useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { useToasts } from 'react-toast-notifications'

import { Tag, TagCreate, TagToggle, TagsQuery, TAG_CREATE, TAGS_QUERY, TAG_TOGGLE } from './graphql'

type TagsContext = {
  activeTag: Tag | null
  addSong: (songId: string) => void
  modifyTags: boolean
  removeSong: (songId: string) => void
  setActiveTag: (tag: Tag | null) => void
  setModifyTags: (modifyTags: boolean) => void
  songsToAdd: string[]
  songsToRemove: string[]
  tags: Tag[]
  tagCreate: (name: string) => void
}

const TagsContext = createContext<Partial<TagsContext>>({})
const TagsContextProvider: React.FC = ({ children }) => {
  const [activeTag, setActiveTag] = useState<Tag | null>(null)
  const [tags, setTags] = useState<Tag[]>([])
  const [modifyTags, internalSetModifyTags] = useState(false)
  const [songsToAdd, setSongsToAdd] = useState<string[]>([])
  const [songsToRemove, setSongsToRemove] = useState<string[]>([])
  const [tagCreateMutation] = useMutation<TagCreate['data'], TagCreate['vars']>(TAG_CREATE)
  const { addToast } = useToasts()

  const [tagToggleMutation] = useMutation<TagToggle['data'], TagToggle['vars']>(TAG_TOGGLE, {
    refetchQueries: ['LibrarySongsQuery'],
    onCompleted: (): void => {
      if (songsToAdd.length > 0) {
        addToast(`Successfully added ${activeTag?.name} to ${songsToAdd.length} song(s).`, {
          appearance: 'success',
          autoDismiss: true,
        })
      }
      if (songsToRemove.length > 0) {
        addToast(`Successfully removed ${activeTag?.name} from ${songsToRemove.length} song(s).`, {
          appearance: 'success',
          autoDismiss: true,
        })
      }

      setSongsToAdd([])
      setSongsToRemove([])
    },
  })

  const setModifyTags = (modifyTags: boolean): void => {
    if (!activeTag) {
      return
    }

    if (modifyTags) {
      setSongsToAdd([])
      setSongsToRemove([])
    } else {
      tagToggleMutation({ variables: { tagId: activeTag.id, addSongIds: songsToAdd, removeSongIds: songsToRemove } })
    }
    internalSetModifyTags(modifyTags)
  }

  const addSong = (songId: string): void => {
    if (!!songsToRemove.find(s => s === songId)) {
      setSongsToRemove(songsToRemove.filter(s => s !== songId))
    } else {
      setSongsToAdd([...songsToAdd, songId])
    }
  }
  const removeSong = (songId: string): void => {
    if (!!songsToAdd.find(s => s === songId)) {
      setSongsToAdd(songsToAdd.filter(s => s !== songId))
    } else {
      setSongsToRemove([...songsToRemove, songId])
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
        addSong,
        modifyTags,
        removeSong,
        setActiveTag,
        setModifyTags,
        songsToAdd,
        songsToRemove,
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
    addSong,
    modifyTags,
    removeSong,
    setActiveTag,
    setModifyTags,
    songsToAdd,
    songsToRemove,
    tagCreate,
    tags,
  } = useContext(TagsContext)

  if (
    activeTag === undefined ||
    addSong === undefined ||
    modifyTags === undefined ||
    removeSong === undefined ||
    setActiveTag === undefined ||
    setModifyTags === undefined ||
    songsToAdd === undefined ||
    songsToRemove === undefined ||
    tagCreate === undefined ||
    tags === undefined
  ) {
    throw new Error('TagsContext accessed before being set')
  }

  return {
    addSong,
    activeTag,
    modifyTags,
    removeSong,
    setActiveTag,
    setModifyTags,
    songsToAdd,
    songsToRemove,
    tagCreate,
    tags,
  }
}
export default TagsContextProvider
