import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import DetailHeader from './DetailHeader'
import DetailBody from './DetailBody'
import DetailFooter from './DetailFooter'

import { useAppSelector } from '@/redux/store.ts'

const DetailPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'merchant' | 'customer'>('merchant')
  const transaction = useAppSelector(state => state.transactionDetail.selectedTransaction)
  const contentRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!transaction) {
      navigate('/home')
    }
  }, [transaction, navigate])

  if (!transaction) {
    return null
  }

  return (
    <div className="flex h-full min-h-[85vh] w-full flex-col items-center justify-center">
      <div>
        <div className="flex flex-col items-end justify-center">
          {transaction.DE3 !== 'ST' && <DetailHeader onSelectionChange={setSelectedTab} />}
          <DetailBody contentRef={contentRef} selectedTab={selectedTab} transaction={transaction} />
        </div>
        <DetailFooter contentRef={contentRef} selectedTab={selectedTab} transaction={transaction} />
      </div>
    </div>
  )
}

export default DetailPage
