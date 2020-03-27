import React, { createContext, useContext, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { RecordListenCreate, RECORD_LISTEN_CREATE } from './graphql'

type ApprovalContext = {
  approval: number
  setApproval: (approval: number) => void
  incrementApproval: (recordId: string) => void
}

const ApprovalContext = createContext<Partial<ApprovalContext>>({})
const ApprovalContextProvider: React.FC = ({ children }) => {
  const [approval, setApproval] = useState(0)
  const [recordListenCreate] = useMutation<RecordListenCreate['data'], RecordListenCreate['vars']>(
    RECORD_LISTEN_CREATE,
    {
      onCompleted: data => {
        setApproval(data.recordListenCreate.recordListen.approval)
      },
    },
  )

  const newApproval = (approval + 1) % 4
  const incrementApproval = (recordId: string): void => {
    recordListenCreate({ variables: { recordId, approval: newApproval } })
  }

  return (
    <ApprovalContext.Provider value={{ approval, incrementApproval, setApproval }}>{children}</ApprovalContext.Provider>
  )
}

export const useApprovalContext: () => ApprovalContext = () => {
  const { approval, incrementApproval, setApproval } = useContext(ApprovalContext)

  if (approval === undefined || incrementApproval === undefined || setApproval === undefined) {
    throw new Error('ApprovalContext accessed before being set')
  }

  return { approval, incrementApproval, setApproval }
}
export default ApprovalContextProvider
