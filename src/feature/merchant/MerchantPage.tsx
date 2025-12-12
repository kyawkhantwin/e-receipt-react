import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table'
import { useNavigate } from 'react-router-dom'

export default function MerchantPage() {
  const navigate = useNavigate()

  const merchants = [
    { id: '1', name: 'Coffee Shop A', category: 'Food & Beverage' },
    { id: '2', name: 'Bookstore B', category: 'Retail' },
    { id: '3', name: 'Electronics Store C', category: 'Electronics' },
  ]

  const handleRowClick = (merchantId: string) => {
    navigate(`/merchants/${merchantId}`)
  }

  return (
    <div>
      <h1>Merchant List</h1>
      <Table>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Category</TableColumn>
        </TableHeader>
        <TableBody>
          {merchants.map(merchant => (
            <TableRow key={merchant.id} onClick={() => handleRowClick(merchant.id)}>
              <TableCell>{merchant.id}</TableCell>
              <TableCell>{merchant.name}</TableCell>
              <TableCell>{merchant.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
