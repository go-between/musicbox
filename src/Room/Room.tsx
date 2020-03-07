import React, { useContext, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import { Flex } from 'rebass'

import { SideNav } from 'components'
import { WebsocketContext } from 'App'

import Chat from './Chat'
import Main from './Main'
import { ROOM_ACTIVATE, RoomActivate } from './graphql'
import PlaylistRecordContextProvider from './PlaylistRecordContextProvider'

const Room: React.FC = () => {
  const { id } = useParams()

  const websocket = useContext(WebsocketContext)
  const [roomActivate, { data, loading }] = useMutation<RoomActivate['data'], RoomActivate['vars']>(ROOM_ACTIVATE, {
    onCompleted: websocket.subscribeForRoom,
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
    <PlaylistRecordContextProvider>
      <Flex
        sx={{
          alignItems: 'top',
          bg: 'background',
          flexDirection: ['column', 'row'],
          minHeight: '100vh',
          mx: 'auto',
          position: 'relative',
        }}
      >
        <SideNav />
        <Main room={data.roomActivate.room} />
        <Chat room={data.roomActivate.room} />
      </Flex>
    </PlaylistRecordContextProvider>
  )
}

export default Room
