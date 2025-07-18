import React, { useMemo } from 'react';
import { htmlStyles, SlipHeader, renderRow } from './SlipBase';
import { useSlipData } from '../hooks/useSlipData';
import { entryModeMap, DE3Map, TransactionType } from '@/types/TransactionType.ts';

interface Props {
    transaction: TransactionType;
    contentRef: React.RefObject<HTMLDivElement>;
    copyFor: string;
}

const TransactionSlip: React.FC<Props> = ({ transaction, contentRef, copyFor }) => {
    const { authData, date } = useSlipData(transaction);
    const isError = transaction.DE39 === 'E';
    const [declineCode, declineReason] = useMemo(() => {
      const [codePart, reason] = transaction.description.split('\n');
      const match = codePart.match(/\\[(.*?)\\]/);
      return [match?.[1] ?? '', reason ?? '']
    }, [transaction.description]);

    const title = DE3Map[transaction.DE3!];
    const entryMode = transaction.DE22 ? entryModeMap[transaction.DE22] : 'QR';

    if (!transaction) {
        return <div>No transaction data available</div>;
    }

    return (
        <div ref={contentRef} className="transaction-slip p-1" style={htmlStyles.page}>
            <SlipHeader merchantName={authData.merchantName!} merchantAddress={authData.merchantAddress!} />
            <div className="flex items-center justify-between" style={{ marginBottom: '1mm' }}>
                {renderRow('Date:', date.date)}
                {renderRow('Time:', date.time)}
            </div>
            {renderRow('TID:', transaction.DE41)}
            {renderRow('MID:', transaction.DE42)}
            {renderRow('Batch Number:', transaction.batch_number)}
            {renderRow('Invoice Number:', transaction.invoice_number)}
            <div style={htmlStyles.title}>{title}</div>
            <p style={{ fontWeight: 'bold', fontSize: '13px', marginBottom: '1.5mm' }}>
                {transaction.card_label || 'QR'}
            </p>
            <div style={htmlStyles.rowSection}>
                {renderRow('Card Number:', transaction.DE2)}
                {renderRow('Expiry Date:', '**/**')}
                {renderRow('Entry Mode:', entryMode)}
                {!isError && renderRow('RRN:', transaction.DE37)}
                {!isError && renderRow('Approval Code:', transaction.DE38)}
            </div>
            {isError ? (
                <div className={'mt-[5mm]'}>
                    {declineCode && renderRow('RESP Code:', declineCode, true, true)}
                    {declineReason && <p style={htmlStyles.valueCenter}>[{declineReason}]</p>}
                </div>
            ) : (
                <div style={htmlStyles.amountSection}>
                    <div style={{ ...htmlStyles.row, margin: '2mm 0' }}>
                        <span style={htmlStyles.amountLabel}>Amount:</span>
                        <span style={htmlStyles.amountValue}>
                            {transaction.DE4 ? ` ${transaction.DE49 || ''} ${transaction.DE4}` : 'N/A'}
                        </span>
                    </div>
                </div>
            )}
            <div style={isError ? htmlStyles.error : htmlStyles.generatedAt}>
                {isError ? '**** ERROR ****' : `**** ${copyFor} COPY ****`}
            </div>
        </div>
    );
};

export default TransactionSlip;

