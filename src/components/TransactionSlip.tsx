import React, { useMemo } from 'react'
import { useSlipData } from '../hooks/useSlipData'
import { htmlStyles, SlipHeader, renderRow } from './SlipBase'
import { entryModeMap, DE3Map, TransactionType } from '@/types/TransactionType.ts'

interface Props {
  transaction: TransactionType
  contentRef: React.RefObject<HTMLDivElement>
  copyFor: string
}

const TransactionSlip: React.FC<Props> = ({ transaction, contentRef, copyFor }) => {
  const { authData, date } = useSlipData(transaction)
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
      <div className="flex items-center justify-between" style={{ marginBottom: '1mm' }}>
        {renderRow('DATE     :', date.date)}
        {renderRow('TIME:', date.time)}
      </div>
      <div className="flex items-center justify-between" style={{ marginBottom: '1mm' }}>
        {renderRow('TRACE NO :', transaction.DE11)}
        {renderRow('INV NO:', transaction.invoice_number)}
      </div>
      {renderRow('TID      :', transaction.DE41)}
      {renderRow('MID      :', transaction.DE42)}
      <div style={htmlStyles.title}>{title}</div>
      {transaction.DE3 !== 'QR' && transaction.DE3 !== 'QRV' && (
        <>
          <p style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '1.5mm' }}>
            {transaction.card_label}
          </p>

          <div style={htmlStyles.rowSection}>
            <div style={{ marginBottom: '0.3mm' }}>
              <span
                style={{
                  fontWeight: 'bold',
                }}
              >
                {transaction.DE2 || 'N/A'}
              </span>
            </div>
            <div style={{ marginBottom: '0.3mm' }}>
              <span
                style={{
                  fontSize: '12px',
                  textAlign: 'right',
                  wordBreak: 'break-word',
                  fontWeight: 'bold',
                }}
              >
                **/**
              </span>
            </div>
            <div style={{ marginBottom: '1.5mm' }}>
              <span
                style={{
                  fontSize: '12px',
                  textAlign: 'right',
                  wordBreak: 'break-word',
                  fontWeight: 'bold',
                }}
              >
                {entryMode}
              </span>
            </div>
          </div>
        </>
      )}

      {!isError && renderRow('TRXN REF : ', transaction.DE37)}
      {!isError && renderRow('TRNX ID  : ', transaction.DE38)}

      {!isError && renderRow('STATUS   : ', transaction.DE39 === 'A' ? 'SUCCESS' : 'DECLINED')}
      {isError ? (
        <div className={'mt-[5mm]'}>
          {renderRow('RESP Code:', declineCode, true, true)}
          {declineReason && <p style={htmlStyles.valueCenter}>[{declineReason}]</p>}
        </div>
      ) : (
        <div style={(htmlStyles.amountSection, htmlStyles.centerRow)}>
          <div style={{ margin: '2mm 0' }}>
            <span style={htmlStyles.amountLabel}>TOTAL {transaction.DE49 || ''}</span>
            <span style={htmlStyles.amountValue}>
              {transaction.DE4 ? `${transaction.DE4}  ` : 'N/A'}
            </span>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div>
          <p style={htmlStyles.valueCenter}>I AGREE TO PAY THE ABOVE TOTAL AMOUNT </p>
          <p style={htmlStyles.valueCenter}> ACCORDING TO THE THE ISSUER AGREEMENT</p>
        </div>
        <p style={htmlStyles.valueCenter}>
          {isError ? '**** ERROR ****' : `**** ${copyFor} COPY ****`}
        </p>
        <p style={htmlStyles.valueCenter}>THANK YOU!</p>
      </div>
    </div>
  )
}

export default TransactionSlip
