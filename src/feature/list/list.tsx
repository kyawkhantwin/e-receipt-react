import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card'
import PosTerminalIcon from '@/components/icons/PosTerminalIcon'
import useMerchantTerminals from '@/hooks/useMerchantTerminals'
import { TerminalData } from '@/types/TerminalTypes'
import { useAuthToken } from '@/utils/useAuthToken'

const ListItem: React.FC<TerminalData> = props => {
  const { getAuthData } = useAuthToken()
  const { merchantName } = getAuthData()
  return (
    <Link to="/home" state={{ serial: props.serial }}>
      <Card className="flex w-full flex-col justify-between overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <CardHeader className="flex flex-col items-start gap-1 p-4">
          <h3 className="text-lg font-bold">{merchantName}</h3>
          <p className="text-sm text-gray-600">{props.address || props.secondaryAddress || 'Not Added'}</p>
        </CardHeader>

        <CardBody className="flex items-center justify-center p-4">
          <PosTerminalIcon size={64} className="text-gray-500" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">SN: {props.serial}</p>
          </div>
        </CardBody>
        <CardFooter className="flex flex-col items-start gap-2 border-t border-gray-200 p-4">
          <div className="flex w-full items-center justify-between">
            <span className="text-sm text-gray-600">Total Sale:</span>
            <span className="text-lg font-bold text-gray-800">{props.totalAmount}</span>
          </div>
          <div className="flex w-full items-center justify-between">
            <span className="text-sm text-gray-600">Total Transactions:</span>
            <span className="text-lg font-bold text-gray-800">{props.totalTransactions}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

function ListPage() {
  const { terminals, loading, error, fetchTerminals } = useMerchantTerminals()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const merchantId = queryParams.get('merchantId') || ''

  console.log('haha', terminals)

  useEffect(() => {
    fetchTerminals(merchantId)
  }, [fetchTerminals, merchantId])

  if (loading) {
    return <div className="p-4">Loading terminals and report...</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
      {terminals && terminals.length > 0 ? (
        terminals.map(terminal => <ListItem key={terminal.serial} {...terminal} />)
      ) : (
        <div className="p-4">No terminals found.</div>
      )}
    </div>
  )
}

export default ListPage
