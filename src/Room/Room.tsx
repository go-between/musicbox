import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import { Flex } from 'rebass'

import { useWebsocketContext } from 'Context'

import Chat from './Chat'
import Main from './Main'
import { ROOM_ACTIVATE, RoomActivate } from './graphql'
import MessagesContextProvider from './MessagesContextProvider'
import PinnedMessagesContextProvider from './PinnedMessagesContextProvider'

const Room: React.FC = () => {
  const { id } = useParams()

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

  if (!data || loading) {
    return <p>Loading</p>
  }

  return (
    <PinnedMessagesContextProvider>
      <MessagesContextProvider>
        <Main room={data.roomActivate.room} />
        <Chat />
      </MessagesContextProvider>
    </PinnedMessagesContextProvider>
  )
}

export default Room
