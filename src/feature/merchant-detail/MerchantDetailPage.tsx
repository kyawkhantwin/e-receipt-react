import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@heroui/button'

import TerminalListItem from '@/components/TerminalListItem'
import useMerchantTerminals from '@/hooks/useMerchantTerminals'
import { useAppSelector } from '@/redux/store'

export default function MerchantDetailPage() {
  const { terminals, fetchTerminals } = useMerchantTerminals()
  const navigate = useNavigate()
  const { merchantId } = useParams<{ merchantId: string }>()
  const selectedMerchant = useAppSelector(state => state.merchant.selectedMerchant)

  useEffect(() => {
    fetchTerminals(merchantId!)
  }, [fetchTerminals, merchantId])

  const handleMangaeUser = () => {
    navigate(`/users/${merchantId}`)
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="mb-4 text-2xl font-bold">Merchant Detail Page</h1>
        <Button className="rounded-md px-4 py-2" onPress={handleMangaeUser}>
          Manage User
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {terminals && terminals.length > 0 ? (
          terminals.map(terminal => (
            <TerminalListItem
              key={terminal.serial}
              {...terminal}
              merchantName={selectedMerchant?.name}
            />
          ))
        ) : (
          <div className="p-4">No terminals found.</div>
        )}
      </div>
    </div>
  )
}
