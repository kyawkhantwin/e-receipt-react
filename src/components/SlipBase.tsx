import { useAppSelector } from '@/redux/store'

export const htmlStyles = {
  page: {
    width: '80mm',
    fontSize: '13px',
    fontFamily: 'Fira Code SemiBold, Arial, Helvetica, sans-serif',
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
    fontSize: '13px',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '3mm',
    textTransform: 'uppercase',
  },
  row: {
    display: 'flex',
    // justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    marginBottom: '1mm',
    // alignItems: 'center',
  },
  centerRow: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1mm',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '10px',
    whiteSpace: 'pre',
  },
  value: {
    flex: 1,
    fontSize: '10px',
    // textAlign: 'right',
    wordBreak: 'break-word',
  },
  valueCenter: {
    fontSize: '9px',
    textAlign: 'center',
    wordBreak: 'break-word',
  },
  // value: {
  //   fontSize: '10px',
  //   wordBreak: 'break-word',
  // },
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
    marginRight: '2mm',
  },
  amountValue: {
    flex: 1,
    fontSize: '13px',
    // textAlign: 'right',
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
} as const

export const SlipHeader = ({
  merchantName,
  merchantAddress,
  merchantAddress2,
  merchantAddress3,
}: {
  merchantName: string
  merchantAddress: string
  merchantAddress2?: string
  merchantAddress3?: string
}) => {
  const selectedMerchant = useAppSelector(state => state.merchant.selectedMerchant)

  const displayMerchantName = selectedMerchant?.name || merchantName
  const displayMerchantAddress = selectedMerchant?.address || merchantAddress
  const displayMerchantAddress2 = selectedMerchant?.address2 || merchantAddress2
  const displayMerchantAddress3 = selectedMerchant?.address3 || merchantAddress3

  return (
    <>
      <div style={htmlStyles.logo}>
        <img
          alt="kbz logo"
          width={180}
          // src={'https://www.kbzbank.com/wp-content/uploads/2018/11/logo1.png'}
          src={'/receipt_logo.jpg'}
        />
      </div>
      <div style={htmlStyles.merchantName}>{displayMerchantName}</div>
      <div style={htmlStyles.merchantAddress}>{displayMerchantAddress}</div>
      <div style={htmlStyles.merchantAddress}>{displayMerchantAddress2}</div>
      <div style={htmlStyles.merchantAddress}>{displayMerchantAddress3}</div>
    </>
  )
}

export const renderRow = (label: string, value?: string, center = false, childbold = false) => (
  <div style={center ? htmlStyles.centerRow : htmlStyles.row}>
    <pre style={htmlStyles.label}>{label}</pre>
    <span
      style={{
        ...(center ? htmlStyles.valueCenter : htmlStyles.value),
        fontWeight: childbold ? 'bold' : 'normal',
      }}
    >
      {value?.trim() || 'N/A'}
    </span>
  </div>
)
