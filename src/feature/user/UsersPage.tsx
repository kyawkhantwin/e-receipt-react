import React, { useCallback, useEffect, useState } from 'react'

import useUserApi, { User } from '../../api/useUserApi'

import { UserCard } from './components/UserCard'
import UserPageHeader from './components/UserPageHeader'

import PageSkeleton from '@/components/skeleton/PageSkeleton'
import AppError from '@/components/error/AppError'
import { useParams } from 'react-router-dom'

const UsersPage: React.FC = () => {
  const { merchantId } = useParams()

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
      <UserPageHeader fetchUsersData={fetchUsersData} role={'merchant'} />
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

export default UsersPage
