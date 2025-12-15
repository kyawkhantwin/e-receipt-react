import React from 'react'
import { Chip } from '@heroui/chip'

import DetailRow from './DetailRow'

interface UserDetailsDisplayProps {
  firstName: string | undefined
  lastName: string | undefined
  merchant_name: string
  merchant_id: string
  app_id: string
  enabled: boolean
}

const UserDetailsDisplay: React.FC<UserDetailsDisplayProps> = ({
  firstName,
  lastName,
  merchant_name,
  merchant_id,
  app_id,
  enabled,
}) => {
  return (
    <>
      <DetailRow label="First Name" value={firstName || 'N/A'} />
      <DetailRow label="Last Name" value={lastName || 'N/A'} />
      <DetailRow label="Merchant" value={merchant_name} />
      <DetailRow label="Merchant ID" value={merchant_id} />
      <DetailRow label="App ID" value={app_id} />

      <div className="flex items-center justify-between">
        <span>Status</span>
        <Chip size="sm" variant="bordered">
          {enabled ? 'Enabled' : 'Disabled'}
        </Chip>
      </div>
    </>
  )
}

export default UserDetailsDisplay
