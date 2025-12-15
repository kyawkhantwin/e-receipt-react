import React, { useCallback, useEffect, useState } from 'react'

import useUserApi, { User } from '../../api/useUserApi'

import UserPageHeader from './components/UserPageHeader'

import PageSkeleton from '@/components/skeleton/PageSkeleton'
import AppError from '@/components/error/AppError'
import AdminUserCard from './components/AdminUserCard'

const AdminUsersPage: React.FC = () => {
  const {
    getAllMerchantUsers,
    getAllMerchantUsersLoading,
    getAllMerchantUsersError,
    getAllMerchantUsersData,
  } = useUserApi()
  const [users, setUsers] = useState<User[]>([])

  const fetchUsersData = useCallback(async () => {
    await getAllMerchantUsers()
  }, [getAllMerchantUsers])

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
      <UserPageHeader fetchUsersData={fetchUsersData} role={'admin'} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {users.map(user => (
          <div key={user.id}>
            <AdminUserCard user={user as any} onUpdated={fetchUsersData} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminUsersPage
