import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import DetailHeader from './DetailHeader'
import DetailBody from './DetailBody'
import DetailFooter from './DetailFooter'

import DefaultLayout from '@/layouts/default.tsx'
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
    <DefaultLayout>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-end justify-center">
          {transaction.DE3 !== 'ST' && <DetailHeader onSelectionChange={setSelectedTab} />}
          <DetailBody contentRef={contentRef} selectedTab={selectedTab} transaction={transaction} />
        </div>
        <DetailFooter
          contentRef={contentRef}
          selectedTab={selectedTab}
          transaction={transaction}
        />
      </div>
    </DefaultLayout>
  )
}

export default DetailPage
