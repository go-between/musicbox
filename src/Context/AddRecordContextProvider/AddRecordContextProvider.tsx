import React, { createContext, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { RoomPlaylistRecordsAdd, ROOM_PLAYLIST_RECORDS_ADD, Song, SongCreateMutation, SONG_CREATE } from './graphql'

type AddRecordContext = {
  addRecords: (...ids: string[]) => void
  addSong: (youtubeId: string, callback?: (song: Song) => void) => void
}
const AddRecordContext = createContext<Partial<AddRecordContext>>({})

export const AddRecordContextProvider: React.FC = ({ children }) => {
  const [recordsAdd] = useMutation<RoomPlaylistRecordsAdd['data'], RoomPlaylistRecordsAdd['vars']>(
    ROOM_PLAYLIST_RECORDS_ADD,
  )
  const [createSong] = useMutation<SongCreateMutation['data'], SongCreateMutation['vars']>(SONG_CREATE)

  const addRecords: AddRecordContext['addRecords'] = (...ids) => {
    recordsAdd({
      variables: { ids },
    })
  }

  const addSong: AddRecordContext['addSong'] = (youtubeId, callback) => {
    createSong({
      variables: { youtubeId },
    }).then(result => {
      if (!result.data) {
        return
      }

      if (!!callback) {
        callback(result.data.songCreate.song)
      }
    })
  }

  return <AddRecordContext.Provider value={{ addRecords, addSong }}>{children}</AddRecordContext.Provider>
}

export const useAddRecordContext = (): AddRecordContext => {
  const { addRecords, addSong } = useContext(AddRecordContext)

  if (addRecords === undefined || addSong === undefined) {
    throw new Error('AddRecordContext has been accessed outside of its provider')
  }

  return {
    addRecords,
    addSong,
  }
}
