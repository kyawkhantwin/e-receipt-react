import { useCallback } from 'react'

import useApiOperation from '../hooks/useApiOperation'

import axiosClient from '@/config/axiosConfig'

export interface User {
  id: number
  email?: string
  username: string
  firstName?: string
  lastName?: string
  emailVerified: boolean
  createdTimestamp: number
  enabled: boolean
  totp: boolean
  disableableCredentialTypes: string[]
  requiredActions: string[]
  notBefore: number
  access: {
    manage: boolean
  }
  role: string
  created_by: string
  serial?: string | null
  user_id: string
  merchant_name: string
  merchant_address: string
  merchant_id: string
  app_id: string
  receipt_on: boolean
  created_at: string
  updated_at: string
}

export interface CreateUserDto {
  // Added comment to trigger re-compilation
  username: string
  firstName?: string
  lastName?: string
  password?: string
  email?: string
  merchantId: string
  serial?: string
  role: string
  merchantAddress: string
  merchantAddress2?: string | null
  merchantName: string
  appId: string
  createdBy: string
}
export interface CreateAdminUserDto {
  username: string
  firstName?: string
  lastName?: string
  password?: string
  email?: string
  role: string
}

export interface UpdateUserDto {
  username?: string
  email?: string
  firstName?: string
  lastName?: string
  enabled?: boolean
  appId?: string
  merchantId?: string
  createdBy?: string
  serial?: string | null
  role?: string
  merchantAddress?: string
  merchantName?: string
}

const useUserApi = () => {
  const createUserOp = useApiOperation(
    useCallback(async (userData: CreateUserDto | CreateAdminUserDto) => {
      const response = await axiosClient.post('/user', userData)

      return response.data
    }, [])
  )

  const getUserOp = useApiOperation(
    useCallback(async (userId: string) => {
      const response = await axiosClient.get(`/user/${userId}`)

      return response.data
    }, [])
  )

  const getAllMerchantUsersOp = useApiOperation(
    useCallback(async (merchantId?: string) => {
      const response = await axiosClient.get('/user', {
        params: merchantId ? { merchantId } : undefined,
      })

      return response.data
    }, [])
  )

  const updateUserOp = useApiOperation(
    useCallback(async (userId: string, userData: UpdateUserDto) => {
      const response = await axiosClient.put(`/user/${userId}`, userData)

      return response.data
    }, [])
  )

  const deleteUserOp = useApiOperation(
    useCallback(async (userId: string) => {
      const response = await axiosClient.delete(`/user/${userId}`)

      return response.data
    }, [])
  )

  return {
    createUser: createUserOp.execute,
    createUserLoading: createUserOp.loading,
    createUserError: createUserOp.error,
    createUserData: createUserOp.data,

    getUser: getUserOp.execute,
    getUserLoading: getUserOp.loading,
    getUserError: getUserOp.error,
    getUserData: getUserOp.data,

    getAllMerchantUsers: getAllMerchantUsersOp.execute,
    getAllMerchantUsersLoading: getAllMerchantUsersOp.loading,
    getAllMerchantUsersError: getAllMerchantUsersOp.error,
    getAllMerchantUsersData: getAllMerchantUsersOp.data,

    updateUser: updateUserOp.execute,
    updateUserLoading: updateUserOp.loading,
    updateUserError: updateUserOp.error,
    updateUserData: updateUserOp.data,

    deleteUser: deleteUserOp.execute,
    deleteUserLoading: deleteUserOp.loading,
    deleteUserError: deleteUserOp.error,
    deleteUserData: deleteUserOp.data,
  }
}

export default useUserApi
