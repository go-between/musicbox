import React, { createContext, useContext, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { TagsQuery, TAGS_QUERY, Tag } from './graphql'

type InputContext = {
  input: string
  setInput: (i: string) => void
  selectedTag: Tag | null
  setSelectedTag: (t: Tag) => void
  setYoutubePreviewId: (y: string) => void
  tags: Tag[]
  youtubePreviewId: string
}
const InputContext = createContext<Partial<InputContext>>({})

export const InputContextProvider: React.FC = ({ children }) => {
  const [input, setInput] = useState('')
  const [youtubePreviewId, setYoutubePreviewId] = useState('')
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null)
  useQuery<TagsQuery['data']>(TAGS_QUERY, {
    fetchPolicy: 'network-only',
    onCompleted: data => setTags(data.tags),
  })

  return (
    <InputContext.Provider
      value={{ input, setInput, selectedTag, setSelectedTag, setYoutubePreviewId, tags, youtubePreviewId }}
    >
      {children}
    </InputContext.Provider>
  )
}

export const useInputContext = (): InputContext => {
  const { input, setInput, selectedTag, setSelectedTag, setYoutubePreviewId, tags, youtubePreviewId } = useContext(
    InputContext,
  )

  if (
    input === undefined ||
    setInput === undefined ||
    selectedTag === undefined ||
    setSelectedTag === undefined ||
    setYoutubePreviewId === undefined ||
    tags === undefined ||
    youtubePreviewId === undefined
  ) {
    throw new Error('InputContext has been accessed outside of its provider')
  }

  return {
    input,
    setInput,
    selectedTag,
    setSelectedTag,
    setYoutubePreviewId,
    tags,
    youtubePreviewId,
  }
}
