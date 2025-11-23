import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card'
import { Spinner } from '@heroui/spinner'
import PosTerminalIcon from '@/components/icons/PosTerminalIcon'
import useMerchantTerminals from '@/hooks/useMerchantTerminals'
import { TerminalData } from '@/types/TerminalTypes'
import { useAuthToken } from '@/utils/useAuthToken'

const TerminalListItem: React.FC<TerminalData> = props => {
  const { getAuthData } = useAuthToken()
  const { merchantName } = getAuthData()
  return (
    <Link to="/home" state={{ serial: props.serial }}>
      <Card className="flex w-full flex-col justify-between overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <CardHeader className="flex flex-col items-start gap-1 p-4">
          <h3 className="text-lg font-bold">{merchantName}</h3>
          <p className="text-sm">{props.address || props.secondaryAddress || 'Not Added'}</p>
        </CardHeader>

        <CardBody className="flex items-center justify-center p-4">
          <PosTerminalIcon size={64} className="" color="grey" />
          <div className="ml-4">
            <p className="text-sm">SN: {props.serial}</p>
          </div>
        </CardBody>
        <CardFooter className="flex flex-col items-start gap-2 border-t border-gray-200 p-4">
          <div className="flex w-full items-center justify-between">
            <span className="text-sm">Total Sale:</span>
            <span className="text-lg font-bold">{props.totalAmount}</span>
          </div>
          <div className="flex w-full items-center justify-between">
            <span className="text-sm">Total Transactions:</span>
            <span className="text-lg font-bold">{props.totalTransactions}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

function ListPage() {
  const { terminals, loading, error, fetchTerminals } = useMerchantTerminals()
  const { getAuthData } = useAuthToken()
  const { merchantId } = getAuthData()

  useEffect(() => {
    fetchTerminals(merchantId!)
  }, [fetchTerminals, merchantId])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-[40%] items-center justify-center">
        <Card className="w-[70%] p-4 text-red-500">
          <CardHeader>
            <h3 className="text-lg font-bold">Can not Fetch</h3>
          </CardHeader>
          <CardBody>
            <p>{error.message}</p>
          </CardBody>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="">
        <h2 className="mb-4 text-2xl font-bold">Total Terminal: {terminals?.length}</h2>
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

export default ListPage
