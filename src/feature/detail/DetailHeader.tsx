import React from 'react'
import { Tabs, Tab } from '@heroui/tabs'

interface DetailHeaderProps {
  onSelectionChange: (key: 'merchant' | 'customer') => void
}

const DetailHeader: React.FC<DetailHeaderProps> = ({ onSelectionChange }) => {
  return (
    <div className="flex w-full items-start justify-center">
      <Tabs
        aria-label="Options"
        onSelectionChange={key => onSelectionChange(key as 'merchant' | 'customer')}
      >
        <Tab key="merchant" title="Merchant" />
        <Tab key="customer" title="Customer" />
      </Tabs>
    </div>
  )
}

export default DetailHeader
