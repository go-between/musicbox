import React from 'react'
import { Flex, Text } from 'rebass'
import { Grid, Star } from 'react-feather'

import { useUserContext } from 'Context'
import { StateAction } from 'lib/types'

type ChatDetailsProps = {
  setTab: StateAction<boolean>
  tab: boolean
}

const ChatDetails: React.FC<ChatDetailsProps> = ({ setTab, tab }) => {
  const user = useUserContext()
  const togglePinnedMessages = (): void => setTab(!tab)

  if (!user.activeRoom) {
    return <p>Loading</p>
  }

  return (
    <>
      <Flex
        sx={{
          alignItems: 'center',
          bg: 'transparent',
          borderBottom: '1px solid',
          borderColor: 'accent',
          justifyContent: 'space-between',
          py: 3,
          px: 2,
          width: '100%',
        }}
      >
        <Flex
          sx={{
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Flex
            sx={{
              alignItems: 'center',
              color: 'muted',
              display: 'flex',
              p: 2,
            }}
          >
            <Grid size={18} />
          </Flex>

          <Text
            sx={{
              fontSize: [1, 2],
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {user.activeRoom.name}
          </Text>
        </Flex>

        <Flex>
          <Flex
            onClick={togglePinnedMessages}
            sx={{
              alignItems: 'center',
              bg: !tab ? 'primaryHover' : 'none',
              borderRadius: 6,
              color: !tab ? 'primary' : 'muted',
              cursor: 'pointer',
              display: 'flex',
              p: 2,
              '&:hover': {
                bg: 'primaryHover',
                color: 'primary',
              },
            }}
          >
            <Star size={18} />
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default ChatDetails
