import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import useUserApi, { User } from '../../api/useUserApi'

import { UserCard } from './components/UserCard'

import PageSkeleton from '@/components/skeleton/PageSkeleton'
import AppError from '@/components/error/AppError'
import { useParams } from 'react-router-dom'
import UserForMerchantCreation from './components/UserForMerchantCreation'
import { RootState } from '@/redux/store'

const MerchantPageUser: React.FC = () => {
  const { merchantId } = useParams()
  const terminals = useSelector((state: RootState) => state.terminal.terminals)
  const terminalSerials = terminals.map(terminal => terminal.serial)

  const {
    getAllMerchantUsers,
    getAllMerchantUsersLoading,
    getAllMerchantUsersError,
    getAllMerchantUsersData,
  } = useUserApi()
  const [users, setUsers] = useState<User[]>([])

  const fetchUsersData = useCallback(async () => {
    await getAllMerchantUsers(merchantId)
  }, [getAllMerchantUsers, merchantId])

  useEffect(() => {
    fetchUsersData()
  }, [fetchUsersData])

  useEffect(() => {
    if (getAllMerchantUsersData) {
      setUsers(getAllMerchantUsersData)
    }
  }, [getAllMerchantUsersData])

  if (getAllMerchantUsersLoading) {
    return (
      <div className="p-4">
        <PageSkeleton count={6} variant="card" />
      </div>
    )
  }

  if (getAllMerchantUsersError) {
    return (
      <AppError
        message={getAllMerchantUsersError.message}
        title="Failed to load users"
        variant="page"
        onRetry={fetchUsersData}
      />
    )
  }

  return (
    <div className="p-4">
      <UserForMerchantCreation
        fetchUsersData={fetchUsersData}
        role={'cashier'}
        terminalSerials={terminalSerials}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {users.map(user => (
          <div key={user.id}>
            <UserCard user={user} onUpdated={fetchUsersData} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MerchantPageUser
