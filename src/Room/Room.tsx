import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import { Flex } from 'rebass'

import { SideNav } from 'components'
import { useWebsocketContext } from 'Context'

import VolumeContextProvider from 'Player/VolumeContextProvider'

import Chat from './Chat'
import Main from './Main'
import { ROOM_ACTIVATE, RoomActivate } from './graphql'
import CurrentRecordContextProvider from './CurrentRecordContextProvider'
import PlaylistRecordContextProvider from './PlaylistRecordContextProvider'

const Room: React.FC = () => {
  const { id } = useParams()

  const websocket = useWebsocketContext()
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
      <CurrentRecordContextProvider>
        <VolumeContextProvider>
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
            <Chat />
          </Flex>
        </VolumeContextProvider>
      </CurrentRecordContextProvider>
    </PlaylistRecordContextProvider>
  )
}

export default Room
