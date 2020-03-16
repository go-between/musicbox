import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Box } from 'rebass'
import { Label, Textarea } from '@rebass/forms'

import { MESSAGE_CREATE, MessageCreate } from './graphql'

const MessageEntry: React.FC = () => {
  const [message, setMessage] = useState<string>('')
  const [messageCreate] = useMutation<MessageCreate['data'], MessageCreate['vars']>(MESSAGE_CREATE)
  // const chatMessageTextarea = document.getElementById('chat-message-textarea')

  var autoExpand = function (field: any) {

    // Reset field height
    field.style.height = 'inherit';

    // Get the computed styles for the element
    var computed = window.getComputedStyle(field);

    // Calculate the height
    var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                 + parseInt(computed.getPropertyValue('padding-top'), 10)
                 + field.scrollHeight
                 + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                 + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    field.style.height = height + 'px';

  };

  document.addEventListener('input', function (event) {
    if (event.target.tagName.toLowerCase() !== 'textarea') return;
    autoExpand(event.target);
  }, false);

  const onChange = (ev: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(ev.target.value)
  }

  const onKeyPress = (ev: React.KeyboardEvent): void => {
    console.log(ev)
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
        bg: 'backgroundTint',
        border: '1px solid',
        borderColor: 'muted',
        borderRadius: 6,
        boxShadow: 'xxl',
        p: 3,
      }}
    >
      <Box>
        <Label fontSize={1} color="gray500">Share your thoughts with the room and hit enter</Label>
        <Textarea
          onChange={onChange}
          placeholder=""
          onKeyPress={onKeyPress}
          value={message}
          id="chat-message-textarea"
          sx={{
            bg: 'backgroundTint',
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

