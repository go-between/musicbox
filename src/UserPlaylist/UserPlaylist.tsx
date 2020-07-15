import React from 'react'
import { Box, Button, Flex } from 'rebass'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

import { usePlaylistRecordsContext, PlaylistRecord } from 'Context'

import UserPlaylistRecord from './UserPlaylistRecord'

type Reorder = (list: PlaylistRecord[], startIndex: number, endIndex: number) => PlaylistRecord[]
const reorder: Reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}
const UserPlaylist: React.FC = () => {
  const { deleteRecord, userPlaylistRecords, reorderRecords } = usePlaylistRecordsContext()

  const removeAll = (): void => reorderRecords([])

  const records = userPlaylistRecords.map((record, index) => {
    const onDelete = (): void => deleteRecord(record.id)
    return (
      <Draggable key={record.id} draggableId={record.id} index={index}>
        {provided => (
          <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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

    const reorderedRecords = reorder(userPlaylistRecords, result.source.index, result.destination.index)
    reorderRecords(reorderedRecords)
  }
  return (
    <Flex flexDirection="column">
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
      <Flex justifyContent="flex-end">{records.length > 0 && <Button onClick={removeAll}>Remove All</Button>}</Flex>
    </Flex>
  )
}

export default UserPlaylist
