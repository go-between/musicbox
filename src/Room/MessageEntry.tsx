import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Box } from 'rebass'
import { Input, Label } from '@rebass/forms'

import { MESSAGE_CREATE, MessageCreate } from './graphql'

const MessageEntry: React.FC = () => {
  const [message, setMessage] = useState<string>('')
  const [messageCreate] = useMutation<MessageCreate['data'], MessageCreate['vars']>(MESSAGE_CREATE)

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(ev.target.value)
  }

  const onKeyPress = (ev: React.KeyboardEvent): void => {
    if (message.length === 0) {
      return
    }

    if (ev.key === 'Enter') {
      messageCreate({ variables: { message } })
      setMessage('')
    }
  }

  return (
    <Box
      sx={{
        bg: 'accent',
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'muted',
        p: 3,
      }}
    >
      <Label>Type Away and Hit Enter</Label>
      <Box>
        <Input type="text" onChange={onChange} placeholder="Message the room" onKeyPress={onKeyPress} value={message} />
      </Box>
    </Box>
  )
}

export default MessageEntry
