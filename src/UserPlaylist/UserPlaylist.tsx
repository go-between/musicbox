import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Box } from 'rebass'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

import { usePlaylistRecordContext } from 'Room'

import { ROOM_PLAYLIST_FOR_USER_QUERY, RoomPlaylistForUserQuery, RoomPlaylistRecord } from './graphql'
import UserPlaylistRecord from './UserPlaylistRecord'

type Reorder = (list: RoomPlaylistRecord[], startIndex: number, endIndex: number) => RoomPlaylistRecord[]
const reorder: Reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}
const UserPlaylist: React.FC = () => {
  const { data, loading } = useQuery<RoomPlaylistForUserQuery['data']>(ROOM_PLAYLIST_FOR_USER_QUERY, {
    fetchPolicy: 'network-only',
  })
  const { deleteRecord, playlistRecords, reorderRecords, setPlaylistRecords } = usePlaylistRecordContext()

  useEffect(() => {
    if (!data) {
      return
    }

    setPlaylistRecords(data.roomPlaylistForUser)
  }, [data, setPlaylistRecords])

  if (loading) {
    return <p>Loading...</p>
  }

  const records = playlistRecords.map((record, index) => {
    const onDelete = (): void => deleteRecord(record.id, { persist: true })
    return (
      <Draggable key={record.id} draggableId={record.id} index={index}>
        {provided => (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={
              {
                // bg:  ? 'blue' : 'red'
              }
            }
          >
            <UserPlaylistRecord record={record} onDelete={onDelete} />
          </Box>
        )}
      </Draggable>
    )
  })

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination || result.destination.index === result.source.index) {
      return
    }

    const reorderedRecords = reorder(playlistRecords, result.source.index, result.destination.index)
    reorderRecords(reorderedRecords)
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            as="ul"
            sx={{
              m: 0,
              p: 0,
            }}
          >
            {records}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default UserPlaylist
