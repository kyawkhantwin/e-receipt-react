import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/table'
import { Chip } from '@heroui/chip'

import convertRawToTransaction from '../../ConvertRawToTransaction.tsx'

import { TransactionTableType } from '@/types/TransactionTableType.ts'
import { TransactionType } from '@/types/TransactionType.ts'

const columns: { key: keyof TransactionTableType | 'timeAgo'; label: string; width?: string }[] = [
  { key: 'rid', label: 'RID', width: '10%' },
  { key: 'amount', label: 'Amount', width: '20%' },
  { key: 'type', label: 'Type', width: '18%' },

  { key: 'statusLabel', label: 'Status', width: '10%' },
  { key: 'timeAgo', label: 'Time Ago', width: '20%' },
  { key: 'dateISO', label: 'Date', width: '20%' },
]

type TransactionTableProps = {
  transactions: TransactionType[]
  handleRowClick: (index: number) => void
}
const TransactionTable = (props: TransactionTableProps) => {
  return (
    <div className="hidden sm:block">
      <Table isStriped className={'shadow-sm'}>
        <TableHeader>
          {columns.map(col => (
            <TableColumn
              key={col.key}
              className="font-bold"
              style={{ width: col.width, minWidth: '100px' }}
            >
              {col.label}
            </TableColumn>
          ))}

        </TableHeader>
        <TableBody>
          {(props?.transactions ?? []).map((transaction, index) => {
            const tx = convertRawToTransaction(transaction)

            return (
              <TableRow
                key={index}
                className="cursor-pointer"
                onClick={() => props.handleRowClick(index)}
              >
                <TableCell style={{ width: columns[0].width }}>{tx.rid}</TableCell>
                <TableCell style={{ width: columns[1].width }}>{tx.amount}</TableCell>
                <TableCell style={{ width: columns[5].width }}>{tx.type}</TableCell>

                <TableCell style={{ width: columns[2].width }}>
                  <Chip color={tx.approved ? 'success' : 'danger'} size="sm" variant="flat">
                    {tx.statusLabel}
                  </Chip>
                </TableCell>
                <TableCell className="text-sm text-gray-500" style={{ width: columns[3].width }}>
                  {tx.dateISO.distanceToNow}
                </TableCell>
                <TableCell style={{ width: columns[4].width }}>{tx.dateISO.date}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default TransactionTable
