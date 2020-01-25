import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'

import { MESSAGES_QUERY, MessagesQuery, Message } from './graphql'

const Messages: React.FC = () => {
  const { data, loading } = useQuery<MessagesQuery['data'], MessagesQuery['vars']>(MESSAGES_QUERY)
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    if (!data) {
      return
    }

    setMessages(data.messages)
  }, [data])

  if (loading) {
    return <p>Loading...</p>
  }

  const messageLines = messages.map(message => {
    const withSong = message.roomPlaylistRecord && <i>during {message.roomPlaylistRecord.song.name}</i>
    const displayDate = moment(message.createdAt).format('ddd h:m a')
    return (
      <div key={message.id}>
        <p>
          <strong>
            {message.user.name} said {withSong} at {displayDate}
          </strong>
        </p>
        <p>{message.message}</p>
      </div>
    )
  })

  return (
    <>
      <p>Chat History</p>
      {messageLines}
    </>
  )
}

export default Messages
