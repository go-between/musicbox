import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Box } from 'rebass'
import { Input, Label, Textarea } from '@rebass/forms'

import { MESSAGE_CREATE, MessageCreate } from './graphql'

const MessageEntry: React.FC = () => {
  const [message, setMessage] = useState<string>('')
  const [messageCreate] = useMutation<MessageCreate['data'], MessageCreate['vars']>(MESSAGE_CREATE)

  const onChange = (ev: React.ChangeEvent<HTMLTextAreaElement>): void => {
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
      <Box>
        <Textarea
          onChange={onChange} placeholder="Share your thoughts with the room and hit enter" onKeyPress={onKeyPress} value={message}
          sx={{
            bg: 'background',
            borderColor: 'transparent',
            borderRadius: 4,
            minHeight:'70px',
            maxHeight: '300px',
            height: 'auto',
            resize: 'vertical',
            overflow: 'auto',
          }}
        />
      </Box>
    </Box>
  )
}

export default MessageEntry
