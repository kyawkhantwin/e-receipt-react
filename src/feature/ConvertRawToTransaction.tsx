import { DE3Map, TransactionType } from '@/types/TransactionType.ts'
import { DE39ResponseMap } from '@/types/TransctionMapper.ts'
import { parseDE7ToDateTime } from '@/utils/DateTimeFormat.ts'

function convertRawToTransaction(raw: TransactionType) {
  return {
    rid: raw.DE11,
    amount: raw.DE4 ? `${raw.DE4} ${raw.DE49}` : `${Number(raw.DE63_02) - Number(raw.DE63_04)}`,
    // @ts-ignore
    statusLabel: DE39ResponseMap[raw.DE39] || raw.description,
    approved: raw.DE39 === 'A',
    dateISO: parseDE7ToDateTime(raw.DE7!),
    type: DE3Map[raw.DE3!],
  }
}
export default convertRawToTransaction
