import React from 'react';
import { CustomLogo } from '@/components/icons.tsx';

export const htmlStyles = {
    page: {
        width: '80mm',
        fontSize: '13px',
        fontFamily: 'Arial, Helvetica, sans-serif',
        boxSizing: 'border-box',
        lineHeight: 1.4,
        backgroundColor: '#fff',
        color: '#000',
    },
    logo: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2mm',
    },
    merchantName: {
        textAlign: 'center',
        fontSize: '13px',
        fontWeight: 'bold',
        marginBottom: '1mm',
    },
    merchantAddress: {
        textAlign: 'center',
        fontSize: '11px',
        marginBottom: '2mm',
    },
    title: {
        fontSize: '15px',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '3mm',
        textTransform: 'uppercase',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1mm',
        alignItems: 'center',
    },
    centerRow: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '1mm',
        alignItems: 'center',
    },
    label: {
        fontWeight: 'bold',
        fontSize: '11px',
        whiteSpace: 'nowrap',
        marginRight: '0.5mm',
    },
    rightValue: {
        flex: 1,
        fontSize: '10px',
        textAlign: 'right',
        wordBreak: 'break-word',
    },
    valueCenter: {
        fontSize: '11px',
        textAlign: 'center',
        wordBreak: 'break-word',
    },
    value: {
        fontSize: '10px',
        wordBreak: 'break-word',
    },
    rowSection: {
        marginBottom: '1mm',
        justifyContent: 'space-between',
    },
    amountSection: {
        marginTop: '2mm',
        paddingTop: '1mm',
        borderTop: '1px dashed #000',
        fontSize: '19px',
    },
    amountLabel: {
        fontWeight: 'bold',
        fontSize: '13px',
    },
    amountValue: {
        flex: 1,
        fontSize: '13px',
        textAlign: 'right',
        wordBreak: 'break-word',
        fontWeight: 'bold',
    },
    generatedAt: {
        marginTop: '2mm',
        fontSize: '13px',
        textAlign: 'center',
    },
    error: {
        fontSize: '17px',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '4mm',
    },
    settmentRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1mm',
        alignItems: 'center',
    },
    settment: {
        fontWeight: 'bold',
        fontSize: '10px',
        whiteSpace: 'nowrap',
        marginRight: '0.5mm',
    },
} as const;

export const SlipHeader = ({ merchantName, merchantAddress }: { merchantName: string, merchantAddress: string }) => (
    <>
        <div style={htmlStyles.logo}>
            <CustomLogo src="/mpu-logo.png" width={60} />
        </div>
        <div style={htmlStyles.merchantName}>{merchantName}</div>
        <div style={htmlStyles.merchantAddress}>{merchantAddress}</div>
    </>
);

export const renderRow = (label: string, value?: string, center = false, childbold = false) => (
    <div style={center ? htmlStyles.centerRow : htmlStyles.row}>
        <span style={htmlStyles.label}>{label}</span>
        <span
            style={{
                ...(center ? htmlStyles.valueCenter : htmlStyles.rightValue),
                fontWeight: childbold ? 'bold' : 'normal',
            }}
        >
            {value?.trim() || 'N/A'}
        </span>
    </div>
);
