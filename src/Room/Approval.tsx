import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button } from 'rebass'

import { useUserContext } from 'Context'

import { Room, RecordListen, RecordListenCreate, RECORD_LISTEN_CREATE } from './graphql'

type Props = {
  currentRecord: Room['currentRecord']
  recordListens: RecordListen[]
}
const Users: React.FC<Props> = ({ currentRecord, recordListens }) => {
  const { id } = useUserContext()
  const [approval, setApproval] = useState(0)

  const newApproval = (approval + 1) % 4
  const [recordListenCreate] = useMutation<RecordListenCreate['data'], RecordListenCreate['vars']>(
    RECORD_LISTEN_CREATE,
    {
      onCompleted: () => setApproval(newApproval),
    },
  )

  useEffect(() => {
    const previousApproval = recordListens.find(listen => listen.user.id === id)?.approval
    setApproval(previousApproval || 0)
  }, [currentRecord, id, recordListens])

  if (!currentRecord) {
    return <></>
  }

  const updateApproval = (): void => {
    recordListenCreate({
      variables: { recordId: currentRecord.id, approval: newApproval },
    })
  }

  return <Button onClick={updateApproval}>Approve ({approval})</Button>
}

export default Users
