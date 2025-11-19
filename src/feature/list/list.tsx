import React from 'react';
import { Card } from '@heroui/card';
import { Home, MapPin, DollarSign, ReceiptText } from 'lucide-react';

interface ListItemProps {
  sn: string;
  address: string;
  totalSale: string;
  totalTransactions: string;
}

const ListItem: React.FC<ListItemProps> = ({ sn, address, totalSale, totalTransactions }) => {
  return (
    <Card className="p-4 flex flex-col gap-4 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <div className="flex items-center gap-2">
          <Home size={20} className="text-gray-600" />
          <span className="text-lg font-semibold text-gray-800">{sn}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={20} className="text-gray-600" />
          <span className="text-md text-gray-700">{address}</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t pt-4 mt-4">
        <div className="flex items-center gap-2">
          <DollarSign size={20} className="text-green-600" />
          <span className="text-md font-medium text-green-700">Total Sale: {totalSale}</span>
        </div>
        <div className="flex items-center gap-2">
          <ReceiptText size={20} className="text-blue-600" />
          <span className="text-md font-medium text-blue-700">Total Transactions: {totalTransactions}</span>
        </div>
      </div>
    </Card>
  );
};

function List() {
  // Dummy data for demonstration
  const items: ListItemProps[] = [
    {
      sn: 'Store A',
      address: '123 Main St, Anytown',
      totalSale: '$1,234.56',
      totalTransactions: '123',
    },
    {
      sn: 'Store B',
      address: '456 Oak Ave, Somewhere',
      totalSale: '$987.65',
      totalTransactions: '87',
    },
    {
      sn: 'Store C',
      address: '789 Pine Ln, Nowhere',
      totalSale: '$543.21',
      totalTransactions: '45',
    },
  ];

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <ListItem key={index} {...item} />
      ))}
    </div>
  );
}

export default List;