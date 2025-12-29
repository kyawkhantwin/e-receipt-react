import React, { useMemo } from 'react'
import { useSlipData } from '../hooks/useSlipData'
import { htmlStyles, SlipHeader, renderRow } from './SlipBase'
import { entryModeMap, DE3Map, TransactionType } from '@/types/TransactionType.ts'

interface Props {
  transaction: TransactionType
  contentRef: React.RefObject<HTMLDivElement>
}

const QRSettlementSlip: React.FC<Props> = ({ transaction, contentRef }) => {
  const { authData, date } = useSlipData(transaction)
  console.log('transaction', transaction)
  const isError = transaction.DE39 === 'E'
  const [declineCode, declineReason] = useMemo(() => {
    const [codePart, reason] = transaction.description.split('\n')
    const match = codePart.match(/\[(\d+)\]/)
    return [match?.[1] ?? '', reason ?? '']
  }, [transaction.description])

  const title = DE3Map[transaction.DE3!]
  const entryMode = transaction.DE22 ? entryModeMap[transaction.DE22] : 'QR'

  if (!transaction) {
    return <div>No transaction data available</div>
  }

  return (
    <div ref={contentRef} className="transaction-slip p-1" style={htmlStyles.page}>
      <SlipHeader
        merchantAddress={authData.merchantAddress!}
        merchantName={authData.merchantName!}
      />
      {renderRow('DATE     :', date.date)}
      {renderRow('TIME     :', date.time)}
      {renderRow('BTH NO   :', transaction.batch_number)}
      {renderRow('INV NO   :', transaction.invoice_number)}
      {transaction.DE3 === 'QR' || transaction.DE3 === 'QRV' ? (
        <>
          {renderRow('TID      :', transaction.DE41)}
          {renderRow('MID      :', transaction.DE42)}
        </>
      ) : (
        <>{renderRow('SHORT CODE:', transaction.short_code)}</>
      )}
      <div style={htmlStyles.title}>{title}</div>
      {transaction.settlements.map(settlement => (
        <React.Fragment key={settlement.id}>
          {renderRow('Trans Id:', settlement.tran_id.toString())}
          {renderRow('Status     :', settlement.status)}
          {renderRow('DATE       :', settlement.date)}
          {renderRow('TIME       :', settlement.time)}
          {/* {renderRow('TRAN ID    :', settlement.tran_id)} */}
          {renderRow('AMOUNT     :', settlement.amount)}
        </React.Fragment>
      ))}

      {renderRow('Refund Total     :', transaction.DE63_04)}
      {renderRow('Sale Total     :', transaction.DE63_02)}

      <div className="flex flex-col gap-2">
        <p style={htmlStyles.valueCenter}>
          {isError ? '**** ERROR ****' : `**** MERCHANT COPY ****`}
        </p>
        <p style={htmlStyles.valueCenter}>THANK YOU!</p>
      </div>
    </div>
  )
}

export default QRSettlementSlip
