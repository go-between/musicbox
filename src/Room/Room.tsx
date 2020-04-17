import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import { Flex } from 'rebass'

import { useWebsocketContext } from 'Context'
import VolumeContextProvider from 'Player/VolumeContextProvider'

import Chat from './Chat'
import Main from './Main'
import { ROOM_ACTIVATE, RoomActivate } from './graphql'
import ApprovalContextProvider from './ApprovalContextProvider'
import MessagesContextProvider from './MessagesContextProvider'

const Room: React.FC = () => {
  const { id } = useParams()

  const websocket = useWebsocketContext()
  const [roomActivate, { data, loading }] = useMutation<RoomActivate['data'], RoomActivate['vars']>(ROOM_ACTIVATE, {
    onCompleted: websocket.subscribeForRoom,
    refetchQueries: ['UserQuery'],
  })

  useEffect(() => {
    if (!id) {
      return
    }

    roomActivate({ variables: { roomId: id } })
    return websocket.unsubscribeForRoom
  }, [id, roomActivate, websocket.unsubscribeForRoom])

  if (!data || loading) {
    return <p>Loading</p>
  }

  return (
    <ApprovalContextProvider>
      <MessagesContextProvider>
        <VolumeContextProvider>
          <Flex
            sx={{
              flexDirection: ['column', 'row'],
              height: '100%',
              width: ['100%'],
            }}
          >
            <Main room={data.roomActivate.room} />
            <Chat />
          </Flex>
        </VolumeContextProvider>
      </MessagesContextProvider>
    </ApprovalContextProvider>
  )
}

export default Room
