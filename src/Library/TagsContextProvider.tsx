import React, { createContext, useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'

import { Tag, TagCreate, TagsQuery, TAG_CREATE, TAGS_QUERY } from './graphql'

type TagsContext = {
  activeTag: Tag | null
  setActiveTag: (tag: Tag) => void
  tags: Tag[]
  tagCreate: (name: string) => void
}

const TagsContext = createContext<Partial<TagsContext>>({})
const TagsContextProvider: React.FC = ({ children }) => {
  const [activeTag, setActiveTag] = useState<Tag | null>(null)
  const [tags, setTags] = useState<Tag[]>([])
  const [tagCreateMutation] = useMutation<TagCreate['data'], TagCreate['vars']>(TAG_CREATE)

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

  return <TagsContext.Provider value={{ activeTag, setActiveTag, tagCreate, tags }}>{children}</TagsContext.Provider>
}

export const useTagsContext: () => TagsContext = () => {
  const { activeTag, setActiveTag, tagCreate, tags } = useContext(TagsContext)

  if (activeTag === undefined || setActiveTag === undefined || tagCreate === undefined || tags === undefined) {
    throw new Error('TagsContext accessed before being set')
  }

  return { activeTag, setActiveTag, tagCreate, tags }
}
export default TagsContextProvider
