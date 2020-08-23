import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'

import { useCurrentRecordContext, useWebsocketContext } from 'Context'

import Chat from './Chat'
import { VideoDetails } from './VideoDetails'
import { ROOM_ACTIVATE, RoomActivate } from './graphql'
import MessagesContextProvider from './MessagesContextProvider'
import PinnedMessagesContextProvider from './PinnedMessagesContextProvider'

const Room: React.FC = () => {
  const { id } = useParams()

  const { setCurrentRecord } = useCurrentRecordContext()
  const websocket = useWebsocketContext()
  const [roomActivate, { data, loading }] = useMutation<RoomActivate['data'], RoomActivate['vars']>(ROOM_ACTIVATE, {
    onCompleted: websocket.subscribeForRoom,
    refetchQueries: ['UserQuery'],
  })

  useEffect(() => {
    websocket.unsubscribeForRoom()
    if (!id) {
      return
    }
    roomActivate({ variables: { roomId: id } })
  }, [id, roomActivate, websocket, websocket.unsubscribeForRoom])

  useEffect(() => {
    if (!data?.roomActivate?.room) {
      return
    }

    setCurrentRecord(data.roomActivate.room.currentRecord)
  }, [data, setCurrentRecord])

  if (!data || loading) {
    return <p>Loading</p>
  }

  return (
    <PinnedMessagesContextProvider>
      <MessagesContextProvider>
        <VideoDetails />
        <Chat />
      </MessagesContextProvider>
    </PinnedMessagesContextProvider>
  )
}

export default Room
