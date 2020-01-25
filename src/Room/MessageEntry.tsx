import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { MESSAGE_CREATE, MessageCreate } from './graphql'

const MessageEntry: React.FC = () => {
  const [message, setMessage] = useState<string>('')
  const [messageCreate] = useMutation<
    MessageCreate['data'],
    MessageCreate['vars']
  >(MESSAGE_CREATE)

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(ev.target.value)
  }

  const onKeyPress = (ev: React.KeyboardEvent): void => {
    if (message.length === 0) {
      return
    }

    if (ev.key === "Enter") {
      messageCreate({variables: { message }})
      setMessage('')
    }
  }

  return (
    <>
      <p>Type Away and Hit Enter</p>
      <input type="text" onChange={onChange} onKeyPress={onKeyPress} value={message} />
    </>
  )
}

export default MessageEntry
