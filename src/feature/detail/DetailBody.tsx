import React from 'react'

import TransactionSlip from '@/components/TransactionSlip.tsx'
import SettlementSlip from '@/components/SettlementSlip.tsx'
import { TransactionType } from '@/types/TransactionType'
import QRSettlementSlip from '@/components/QRSettlementSlip'

interface DetailBodyProps {
  transaction: TransactionType
  selectedTab: 'merchant' | 'customer'
  contentRef: React.RefObject<HTMLDivElement>
}

const DetailBody: React.FC<DetailBodyProps> = ({ transaction, selectedTab, contentRef }) => {
  return (
    <div
      className="mt-4 rounded p-1 shadow-sm"
      style={{
        minHeight: '50vh',
        overflow: 'auto',
        maxWidth: '58mm',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {transaction.DE3 === 'ST' ? (
        <SettlementSlip contentRef={contentRef} transaction={transaction} />
      ) : transaction.DE3 === 'QRST' ? (
        <QRSettlementSlip contentRef={contentRef} transaction={transaction} />
      ) : (
        <TransactionSlip
          contentRef={contentRef}
          copyFor={selectedTab === 'merchant' ? 'Merchant' : 'Customer'}
          transaction={transaction}
        />
      )}
    </div>
  )
}

export default DetailBody
