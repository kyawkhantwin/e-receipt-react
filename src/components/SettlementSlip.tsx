import React from 'react';
import { htmlStyles, SlipHeader, renderRow } from './SlipBase';
import { useSlipData } from '../hooks/useSlipData';
import { TransactionType } from '@/types/TransactionType.ts'

const SettlementSlip: React.FC<PrintableTransactionSlipProps> = ({ transaction, contentRef }) => {
    const { authData, date } = useSlipData(transaction);

    if (!transaction) {
        return <div>No transaction data available</div>;
    }

    const renderSettmentRow = (
        label: string,
        count: string | undefined,
        currency: string,
        value: string
    ) => (
        <div style={htmlStyles.settmentRow}>
            <div style={{ ...htmlStyles.settmentRow, width: '60%' }}>
                <span style={{ ...htmlStyles.settment, width: '15mm' }}>{label}</span>
                <span style={{ ...htmlStyles.settment, textAlign: 'end' }}>{count}</span>
                <span style={htmlStyles.settment}>{currency}</span>
            </div>
            <span style={htmlStyles.settment}>{value}</span>
        </div>
    );

    const renderDateTime = () => (
        <div className="flex items-center justify-between" style={{ marginBottom: '1mm' }}>
            {renderRow('Date:', date.date)}
            {renderRow('Time:', date.time)}
        </div>
    );

    return (
        <div ref={contentRef} className="transaction-slip p-1" style={htmlStyles.page}>
            <div>
                <SlipHeader merchantName={authData.merchantName!} merchantAddress={authData.merchantAddress!} />
                <div style={htmlStyles.title}>SETTLEMENT</div>
                {renderDateTime()}
                {renderRow('TID:', transaction.DE41)}
                {renderRow('MID:', transaction.DE42)}
                {renderRow('Batch Number:', transaction.batch_number)}
                <p style={{ fontWeight: 'bold', fontSize: '13px', margin: '3mm 0' }}>
                    {transaction.card_label || 'QR'}
                </p>
                <div style={{ marginBottom: '2mm' }} />
                <div style={htmlStyles.rowSection}>
                    {renderSettmentRow('TYPES', 'CNT', 'CUR', 'AMT')}
                    <div style={{ marginBottom: '2mm' }} />
                    {renderSettmentRow('SALES', transaction.DE63_01, 'MMK', transaction.DE63_02!)}
                    {renderSettmentRow('REFUNDS', transaction.DE63_03, 'MMK', transaction.DE63_04!)}
                </div>
                <div style={htmlStyles.amountSection}>
                    {renderSettmentRow(
                        'TOTAL',
                        String(Number(transaction.DE63_01) + Number(transaction.DE63_03)),
                        'MMK',
                        String(Number(transaction.DE63_02) - Number(transaction.DE63_04))
                    )}
                </div>
            </div>
        </div>
    );
};

interface PrintableTransactionSlipProps {
    transaction: TransactionType;
    contentRef: React.RefObject<HTMLDivElement>;
}

export default SettlementSlip;

