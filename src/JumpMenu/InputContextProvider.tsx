import React, { createContext, useContext, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { TagsQuery, TAGS_QUERY, Tag } from './graphql'

type InputContext = {
  clear: () => void
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
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null)

  const [tags, setTags] = useState<Tag[]>([])
  useQuery<TagsQuery['data']>(TAGS_QUERY, {
    fetchPolicy: 'network-only',
    onCompleted: data => setTags(data.tags),
  })

  const clear = (): void => {
    setInput('')
    setYoutubePreviewId('')
    setSelectedTag(null)
  }

  return (
    <InputContext.Provider
      value={{ clear, input, setInput, selectedTag, setSelectedTag, setYoutubePreviewId, tags, youtubePreviewId }}
    >
      {children}
    </InputContext.Provider>
  )
}

export const useInputContext = (): InputContext => {
  const {
    clear,
    input,
    setInput,
    selectedTag,
    setSelectedTag,
    setYoutubePreviewId,
    tags,
    youtubePreviewId,
  } = useContext(InputContext)

  if (
    clear === undefined ||
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
    clear,
    input,
    setInput,
    selectedTag,
    setSelectedTag,
    setYoutubePreviewId,
    tags,
    youtubePreviewId,
  }
}
