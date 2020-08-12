import React from 'react'
import { Box, Button, Flex, Text } from 'rebass'
import Gravatar from 'react-gravatar'

import { useApprovalContext } from './ApprovalContextProvider'
import { ThumbsUp } from 'react-feather'
import { Th } from '~/components'

const Approval: React.FC = () => {
  const { approval, incrementApproval, recordListens } = useApprovalContext()

  const approvals = recordListens.map(a => {
    return (
      <Flex key={a.user.id} sx={{ position: 'relative', ml: 3 }}>
        <Gravatar email={a.user.email} size={32} style={{ borderRadius: '100%' }} />
        <Text fontSize="24px" sx={{ position: 'absolute', left: '50%', ml: '-8px' }}>
          {a.approval}
        </Text>
      </Flex>
    )
  })
  const updateApproval = (): void => incrementApproval()
  return (
    <Flex justifyContent="flex-end" width="100%" alignItems="center">
      <Box
        as='button'
        onClick={updateApproval}
        sx={{
          alignItems: 'center',
          bg: 'primary',
          border: 'none',
          borderRadius: '100%',
          color: 'indigo100',
          cursor: 'pointer',
          display: 'flex',
          p: 2,
        }}
      >
        <ThumbsUp size={20} />
      </Box>
      <Flex>{approvals}</Flex>
    </Flex>
  )
}

export default Approval
