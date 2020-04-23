import React from 'react'
import { Button, Flex, Text } from 'rebass'
import Gravatar from 'react-gravatar'

import { useApprovalContext } from './ApprovalContextProvider'

const Approval: React.FC = () => {
  const { approval, incrementApproval, recordListens } = useApprovalContext()

  const approvals = recordListens.map(a => {
    return (
      <Flex key={a.user.id} sx={{ position: 'relative', mr: 2 }}>
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
      <Flex>{approvals}</Flex>
      <Button onClick={updateApproval}>Approve ({approval})</Button>
    </Flex>
  )
}

export default Approval
