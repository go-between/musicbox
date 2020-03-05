import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import { Flex } from 'rebass'

import { SideNav } from 'components'

import Chat from './Chat'
import Main from './Main'
import { ROOM_ACTIVATE, RoomActivate } from './graphql'
import PlaylistRecordContextProvider from './PlaylistRecordContextProvider'

const Room: React.FC = () => {
  const { id } = useParams()

  const [roomActivate, { data, loading }] = useMutation<RoomActivate['data'], RoomActivate['vars']>(ROOM_ACTIVATE)

  useEffect(() => {
    if (!id) {
      return
    }

    roomActivate({ variables: { roomId: id } })
  }, [id, roomActivate])

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
