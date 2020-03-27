import React, { useEffect } from 'react'
import { Button } from 'rebass'

import { useUserContext } from 'Context'

import { useApprovalContext } from './ApprovalContextProvider'

import { Room, RecordListen } from './graphql'

type Props = {
  currentRecord: Room['currentRecord']
  recordListens: RecordListen[]
}
const Users: React.FC<Props> = ({ currentRecord, recordListens }) => {
  const { id } = useUserContext()
  const { approval, incrementApproval, setApproval } = useApprovalContext()

  useEffect(() => {
    const previousApproval = recordListens.find(listen => listen.user.id === id)?.approval || 0
    setApproval(previousApproval)
  }, [currentRecord, id, recordListens, setApproval])

  if (!currentRecord) {
    return <></>
  }

  const updateApproval = (): void => incrementApproval(currentRecord.id)
  return <Button onClick={updateApproval}>Approve ({approval})</Button>
}

export default Users
