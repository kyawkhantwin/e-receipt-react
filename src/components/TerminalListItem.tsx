import { Link } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card'
import PosTerminalIcon from '@/components/icons/PosTerminalIcon'
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

export default TerminalListItem
