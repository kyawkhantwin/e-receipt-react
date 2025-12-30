import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import PosTerminalIcon from '@/components/icons/PosTerminalIcon'
import { TerminalData } from '@/types/TerminalTypes'
import { setSelectedTerminal } from '@/redux/slices/terminalSlice'

const TerminalListItem: React.FC<
  TerminalData & { merchantName: string | null | undefined }
> = props => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = () => {
    dispatch(setSelectedTerminal(props))
    navigate('/home', { state: { serial: props.serial } })
  }

  return (
    <div onClick={handleClick}>
      <Card className="flex w-full flex-col justify-between overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <CardHeader className="flex flex-col items-start gap-1 p-4">
          <h3 className="text-lg font-bold">{props.name || 'No Terminal Name'}</h3>
          <p className="text-sm">{props.merchantName}</p>

          <p className="text-sm">{props.address || props.address2 || 'Not Added'}</p>
        </CardHeader>

        <CardBody className="flex items-center justify-center p-4">
          <PosTerminalIcon className="" color="grey" size={64} />
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
    </div>
  )
}

export default TerminalListItem
