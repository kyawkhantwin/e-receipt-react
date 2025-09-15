import { Card, CardBody, CardHeader } from '@heroui/card'
import { Chip } from '@heroui/chip'

import convertRawToTransaction from '@/feature/ConvertRawToTransaction.tsx'
import { TransactionType } from '@/types/TransactionType.ts'
type TransactionListProps = {
  transactions: TransactionType[]
  handleRowClick: (index: number) => void
}
const TransactionList = (props: TransactionListProps) => {
  return (
    <div className="block space-y-3 sm:hidden">
      {props.transactions.map((transaction, index) => {
        const tx = convertRawToTransaction(transaction)

        return (
          <Card
            key={index}
            isPressable
            className="w-full cursor-pointer shadow"
            onPress={() => props.handleRowClick(index)}
          >
            <CardHeader className="flex items-center justify-between text-sm font-semibold text-gray-800">
              <span>RID: {tx.rid}</span>
              <span>{tx.dateISO.date}</span>
            </CardHeader>

            <CardBody className="space-y-2">
              <div className="text-base font-bold text-blue-600">{tx.amount}</div>

              <div className="flex items-center justify-between text-sm">
                <Chip color={tx.approved ? 'success' : 'danger'} size="sm" variant="flat">
                  {tx.statusLabel}
                </Chip>
                <span className="text-gray-500">{tx.dateISO.distanceToNow}</span>
              </div>
            </CardBody>
          </Card>
          // </Button>
        )
      })}
    </div>
  )
}

export default TransactionList
