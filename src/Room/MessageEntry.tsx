import React, { createRef, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Box } from 'rebass'
import { Label, Textarea } from '@rebass/forms'

import { MESSAGE_CREATE, MessageCreate } from './graphql'

const MessageEntry: React.FC = () => {
  const [message, setMessage] = useState<string>('')
  const [messageCreate] = useMutation<MessageCreate['data'], MessageCreate['vars']>(MESSAGE_CREATE)
  const textArea = createRef<HTMLTextAreaElement>()

  const autoExpand = ():void => {
    if (!textArea.current) {
      return
    }
    textArea.current.style.height = 'inherit'

    const computed = window.getComputedStyle(textArea.current)
    const height =
      parseInt(computed.getPropertyValue('border-top-width'), 10) +
      parseInt(computed.getPropertyValue('padding-top'), 10) +
      textArea.current.scrollHeight +
      parseInt(computed.getPropertyValue('padding-bottom'), 10) +
      parseInt(computed.getPropertyValue('border-bottom-width'), 10)

    textArea.current.style.height = height + 'px'
  }

  const onChange = (ev: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(ev.target.value)
    autoExpand()
  }

  const onKeyPress = (ev: React.KeyboardEvent): void => {
    if (message.trim().length === 0) {
      return
    }

    if (ev.key === 'Enter') {
      ev.preventDefault()
      messageCreate({ variables: { message } })
      setMessage('')
    }
  }

  return (
    <Box
      sx={{
        bg: 'background',
        border: '1px solid',
        borderColor: 'muted',
        borderRadius: 6,
        boxShadow: 'xxl',
        p: 2,
      }}
    >
      <Box>
        <Label fontSize={1} color="gray300" p={2}>
          Share your thoughts with the room and hit enter
        </Label>
        <Textarea
          onChange={onChange}
          ref={textArea}
          placeholder=""
          onKeyPress={onKeyPress}
          onKeyUp={autoExpand}
          value={message}
          id="chat-message-textarea"
          sx={{
            bg: 'accent',
            borderColor: 'transparent',
            borderRadius: 3,
            color: 'text',
            height: 'auto',
            maxHeight: '300px',
            resize: 'none',
            outline: 'none',
            overflow: 'auto',
          }}
        />
      </Box>
    </Box>
  )
}

export default MessageEntry
