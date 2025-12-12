import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TerminalListItem from '@/components/TerminalListItem'
import useMerchantTerminals from '@/hooks/useMerchantTerminals'
import { useAuthToken } from '@/utils/useAuthToken'
import { Button } from '@heroui/button'

export default function MerchantDetailPage() {
  const { terminals, fetchTerminals } = useMerchantTerminals()
  const { getAuthData } = useAuthToken()
  const { merchantId } = getAuthData()
  const navigate = useNavigate()
  useEffect(() => {
    fetchTerminals(merchantId!)
  }, [fetchTerminals, merchantId])

  const handleMangaeUser = () => {
    navigate('/users')
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1>Merchant Detail Page</h1>
        <Button onPress={handleMangaeUser} className="rounded-md px-4 py-2">
          Manage User
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {terminals && terminals.length > 0 ? (
          terminals.map(terminal => <TerminalListItem key={terminal.serial} {...terminal} />)
        ) : (
          <div className="p-4">No terminals found.</div>
        )}
      </div>
    </div>
  )
}
