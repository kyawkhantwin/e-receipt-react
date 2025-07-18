// import { parseDE7ToISO } from "@/utils/DateTimeFormat.ts";
// import { format, parseISO } from "date-fns";
// import React from "react";
// import { useAuthToken } from "@/utils/useAuthToken.tsx";
// import { Logo } from '@/components/icons.tsx'
//
//
//
//
// const MerchantSlip: React.FC<PrintableTransactionSlipProps> = ({ transaction, contentRef, }) => {
//
//
//
//   const { getAuthData } = useAuthToken();
//   const authData = getAuthData();
//
//   const datetime = transaction.DE7
//     ? parseDE7ToISO(transaction.DE7)
//     : new Date().toISOString();
//   const dt = parseISO(datetime);
//
//   if (!transaction) {
//     return <div>No transaction data available</div>;
//   }
//
//   return (
//     <div ref={contentRef}   style={htmlStyles.page} className="transaction-slip">
//       <div style={htmlStyles.logo}>
//         <Logo width={45} />
//       </div>
//       <div style={htmlStyles.merchantName}>UTS Myanmar</div>
//       <div style={htmlStyles.merchantAddress}>{authData.merchantName}</div>
//       <div style={htmlStyles.merchantAddress}>{authData.merchantAddress}</div>
//
//       <div style={htmlStyles.title}>
//         {
//           transaction.DE39 ==="E" ? "Error Transaction":
//             transaction.DE3 === "QR" ? "Sale Transaction" :
//               transaction.DE3 === "QRV" ? "Refund Transaction" :
//                 "Error Transaction"}
//       </div>
//
//       <div style={htmlStyles.rowSection}>
//         <div style={htmlStyles.row}>
//           <span style={htmlStyles.label}>Date:</span>
//           <span style={htmlStyles.value}>{format(dt, "yyyy-MM-dd")}</span>
//         </div>
//         <div style={htmlStyles.row}>
//           <span style={htmlStyles.label}>Time:</span>
//           <span style={htmlStyles.value}>{format(dt, "hh:mm:ss aa")}</span>
//         </div>
//         <div style={htmlStyles.row}>
//           <span style={htmlStyles.label}>Merchant ID:</span>
//           <span style={htmlStyles.value}>{transaction.DE42?.trim() ? transaction.DE42 : "N/A"}</span>
//         </div>
//         <div style={htmlStyles.row}>
//           <span style={htmlStyles.label}>Terminal ID:</span>
//           <span style={htmlStyles.value}>{transaction.DE41?.trim() ? transaction.DE41 : "N/A"}</span>
//         </div>
//         <div style={htmlStyles.row}>
//           <span style={htmlStyles.label}>Account Number:</span>
//           <span style={htmlStyles.value}>{transaction.DE2?.trim() ? transaction.DE2 : "N/A"}</span>
//         </div>
//         <div style={htmlStyles.row}>
//           <span style={htmlStyles.label}>Type:</span>
//           <span style={htmlStyles.value}>{transaction.DE3?.trim() ? transaction.DE3 : "N/A"}</span>
//         </div>
//         <div style={htmlStyles.row}>
//           <span style={htmlStyles.label}>Trace No.:</span>
//           <span style={htmlStyles.value}>{transaction.DE11?.trim() ? transaction.DE11 : "N/A"}</span>
//         </div>
//         <div style={htmlStyles.row}>
//           <span style={htmlStyles.label}>Entry Mode:</span>
//           <span style={htmlStyles.value}>
//       {transaction.DE22?.trim() ? transaction.DE22 : "N/A"}
//     </span>
//         </div>
//         <div style={htmlStyles.row}>
//           <span style={htmlStyles.label}>Ref:</span>
//           <span style={htmlStyles.value}>
//       {transaction.DE37?.trim() ? transaction.DE37 : "N/A"}
//     </span>
//         </div>
//         <div style={htmlStyles.row}>
//           <span style={htmlStyles.label}>Auth ID:</span>
//           <span style={htmlStyles.value}>{transaction.DE38?.trim() ? transaction.DE38 : "N/A"}</span>
//         </div>
//         <div style={htmlStyles.row}>
//           <span style={htmlStyles.label}>Description:</span>
//           <span style={htmlStyles.value}>{transaction.description?.trim() ? transaction.description : "N/A"}</span>
//         </div>
//       </div>
//
//       <div style={htmlStyles.amountSection}>
//         <div style={htmlStyles.row}>
//           <span style={htmlStyles.amountLabel}>Transaction Amount:</span>
//           <span style={htmlStyles.value}>
//             {transaction.DE4
//               ? `${transaction.DE4} ${transaction.DE49 || ""}`
//               : "N/A"}
//           </span>
//         </div>
//         <div style={htmlStyles.generatedAt}>
//           {/*Generated: {new Date().toLocaleString()}*/}
//           **** CUSTOMER COPY ****
//         </div>
//       </div>
//     </div>
//
//   );
// };
// const htmlStyles = {
//   page: {
//     width: "80mm",
//     // padding: "4mm",
//     // paddingRight:"4mm",
//     // margin:"3mm",
//     fontSize: "13px",
//     fontFamily: "Arial, Helvetica, sans-serif",
//     boxSizing: "border-box",
//     lineHeight: "1.4",
//     backgroundColor: "#fff",
//     color: "#000",
//
//   },
//   logo: {
//     display: "flex",
//     justifyContent: "center",
//     marginBottom: "2mm",
//   },
//   merchantName: {
//     textAlign: 'center',
//     fontSize: "16px",
//     fontWeight: "bold",
//     marginBottom: "1mm",
//   },
//   merchantAddress: {
//     textAlign: "center",
//     fontSize: "14px",
//     marginBottom: "2mm",
//   },
//   title: {
//     fontSize: "14px",
//     fontWeight: "bold",
//     textAlign: "center",
//     margin: "2mm",
//     borderTop: "1px dashed #000",
//     borderBottom: "1px dashed #000",
//     padding: "2mm",
//   },
//   rowSection: {
//     marginBottom: "1mm",
//   },
//   row: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginBottom: "1mm",
//   },
//   label: {
//     fontWeight: "bold",
//     fontSize: "13px",
//     whiteSpace: "nowrap",
//     // maxWidth: "24mm",
//   },
//   value: {
//     fontSize: "13px",
//     textAlign: "right",
//     flex: 1,
//     wordBreak: "break-word",
//   },
//   amountSection: {
//     marginTop: "2mm",
//     paddingTop: "1mm",
//     borderTop: "1px dashed #000",
//     fontSize: "19px",
//   },
//   amountLabel: {
//     fontWeight: "bold",
//     fontSize: "12px",
//   },
//   generatedAt: {
//     marginTop: "2mm",
//     fontSize: "13px",
//     textAlign: "center",
//   },
//
// } as const
// interface Transaction {
//   DE2?: string;
//   DE3?: string ;
//   DE4?: string;
//   DE7?: string;
//   DE11?: string;
//   DE22?: string ;
//   DE37?: string;
//   DE38?: string;
//   DE39?: string ;
//   DE41?: string;
//   DE42?: string;
//   DE49?: string;
//   description?: string;
// }
//
// interface PrintableTransactionSlipProps {
//   transaction: Transaction;
//   contentRef: React.RefObject<HTMLDivElement>;
// }
// export default MerchantSlip;
