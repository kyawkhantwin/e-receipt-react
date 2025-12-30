import React from 'react'
import { useSlipData } from '../hooks/useSlipData'
import { htmlStyles, SlipHeader, renderRow } from './SlipBase'
import { DE3Map, TransactionType } from '@/types/TransactionType.ts'

interface Props {
  transaction: TransactionType
  contentRef: React.RefObject<HTMLDivElement>
}

const QRSettlementSlip: React.FC<Props> = ({ transaction, contentRef }) => {
  const { authData, date } = useSlipData(transaction)
  const isError = transaction.DE39 === 'E'

  const title = DE3Map[transaction.DE3!]

  if (!transaction) {
    return <div>No transaction data available</div>
  }

  return (
    <div ref={contentRef} className="transaction-slip p-1" style={htmlStyles.page}>
      <SlipHeader
        merchantAddress={authData.merchantAddress!}
        merchantName={authData.merchantName!}
        merchantAddress2={authData.merchantAddress2}
        merchantAddress3={authData.merchantAddress3}
      />
      {renderRow('DATE     :', date.date)}
      {renderRow('TIME     :', date.time)}
      <div className="flex">
        {renderRow('BTH NO   :', transaction.batch_number)}
        <div className="ms-3">{renderRow('INV NO:', transaction.invoice_number)}</div>
      </div>

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
        <div style={{ marginBottom: '6mm' }} key={settlement.id}>
          {renderRow('Trans Id:', settlement.tran_id.toString())}
          {renderRow('Status     :', settlement.status)}
          {renderRow('DATE       :', settlement.date)}
          {renderRow('TIME       :', settlement.time)}
          {/* {renderRow('TRAN ID    :', settlement.tran_id)} */}
          {renderRow('AMOUNT     :', transaction.DE49 + ' ' + settlement.amount)}
        </div>
      ))}

      <hr className="my-2" />
      {renderRow('Refund Total:', transaction.DE49 + '        ' + transaction.DE63_04)}

      <hr className="my-2" />

      {renderRow('Sale Total:', transaction.DE49 + '      ' + transaction.DE63_02)}

      <hr className="my-2" />

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
