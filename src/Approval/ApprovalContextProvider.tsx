import React, { createContext, useContext, useEffect, useState } from 'react'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'

import { useCurrentRecordContext, useUserContext, useWebsocketContext } from 'Context'

import { RecordListen, RecordListenCreate, RecordListensQuery, RECORD_LISTEN_CREATE, RECORD_LISTENS } from './graphql'

type ApprovalContext = {
  approval: number
  incrementApproval: () => void
  recordListens: RecordListen[]
}

const ApprovalContext = createContext<Partial<ApprovalContext>>({})
const ApprovalContextProvider: React.FC = ({ children }) => {
  const { currentRecord } = useCurrentRecordContext()
  const { id } = useUserContext()

  const [approval, setApproval] = useState(0)
  const [recordListens, setRecordListens] = useState<RecordListen[]>([])
  const [loadRecordListensMutation] = useLazyQuery<RecordListensQuery['data'], RecordListensQuery['vars']>(
    RECORD_LISTENS,
    {
      fetchPolicy: 'network-only',
      onCompleted: data => setRecordListens(data.recordListens),
    },
  )

  const [recordListenCreate] = useMutation<RecordListenCreate['data'], RecordListenCreate['vars']>(
    RECORD_LISTEN_CREATE,
    {
      onCompleted: data => {
        setApproval(data.recordListenCreate.recordListen.approval)
      },
    },
  )

  const newApproval = (approval + 1) % 4
  const incrementApproval = (): void => {
    if (!currentRecord) {
      return
    }
    recordListenCreate({ variables: { recordId: currentRecord.id, approval: newApproval } })
  }

  const websocket = useWebsocketContext()
  useEffect(() => {
    return websocket.subscribeToRecordListens(recordListens => {
      setRecordListens(recordListens)
    })
  }, [websocket])

  useEffect(() => {
    const previousApproval = recordListens.find(listen => listen.user.id === id)?.approval || 0
    setApproval(previousApproval)
  }, [id, recordListens, setApproval])

  useEffect(() => {
    if (!currentRecord) {
      setApproval(0)
      setRecordListens([])
      return
    }

    loadRecordListensMutation({ variables: { recordId: currentRecord.id } })
  }, [currentRecord, loadRecordListensMutation])

  return (
    <ApprovalContext.Provider value={{ approval, incrementApproval, recordListens }}>
      {children}
    </ApprovalContext.Provider>
  )
}

export const useApprovalContext: () => ApprovalContext = () => {
  const { approval, incrementApproval, recordListens } = useContext(ApprovalContext)

  if (approval === undefined || incrementApproval === undefined || recordListens === undefined) {
    throw new Error('ApprovalContext accessed before being set')
  }

  return { approval, incrementApproval, recordListens }
}
export default ApprovalContextProvider
