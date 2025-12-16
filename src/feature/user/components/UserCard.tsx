import React, { useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card'
import { Chip } from '@heroui/chip'
import { Button } from '@heroui/button'

import { editUserSchema } from '../schema/editUserSchema'
import { editUserFields, UserData } from '../type/UserData'

import UserDetailsDisplay from './UserDetailsDisplay'

import ReusableModalInputs from '@/components/ResuableModelInputs'
import useUserApi, { User } from '@/api/useUserApi'
import { useAuthToken } from '@/utils/useAuthToken'

interface UserCardProps {
  user: User
  onUpdated?: () => void
}

export const UserCard: React.FC<UserCardProps> = ({ user, onUpdated }) => {
  const { getAuthData } = useAuthToken()
  const { userId } = getAuthData()

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingUserId, setEditingUserId] = useState<string | null>(null)
  const [editFormData, setEditFormData] = useState<UserData>({} as UserData)
  const [editErrors, setEditErrors] = useState<Record<string, string>>({})
  const { updateUser, updateUserLoading, getAllMerchantUsers, deleteUser, deleteUserLoading } =
    useUserApi()
  function openEditModalFor(userData: UserCardProps['user']) {
    setEditingUserId(String(userData.user_id))
    setEditFormData({
      username: userData.username ?? '',
      email: userData.email ?? '',
      firstName: userData.firstName ?? '',
      lastName: userData.lastName ?? '',
      enabled: Boolean(true),
      appId: userData.app_id ?? '',
      merchantId: userData.merchant_id ?? '',
      createdBy: userData.created_by,
      role: userData.role ?? '',
      merchantAddress: userData.merchant_address,
      merchantName: userData.merchant_name ?? '',
    })
    setEditErrors({})
    setIsEditModalOpen(true)
  }

  async function handleEditUserSubmit() {
    await updateUser(editingUserId!, editFormData)
    await getAllMerchantUsers(editFormData.merchantId)
    setIsEditModalOpen(false)
    setEditingUserId(null)
    setEditFormData({} as UserData)
    setEditErrors({})
    onUpdated?.()
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false)
    setEditingUserId(null)
    setEditErrors({})
  }

  return (
    <Card key={user.id} className="rounded-2xl shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="flex items-start justify-between p-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">{user.username}</h2>
          <span className="text-xs font-normal">Serial #{user.serial}</span>
        </div>

        <Chip color="success" size="sm" variant="bordered">
          {user.role}
        </Chip>
      </CardHeader>

      <CardBody className="space-y-3 p-4 text-sm">
        <UserDetailsDisplay
          app_id={user.app_id}
          enabled={user.enabled}
          firstName={user.firstName}
          lastName={user.lastName}
          merchant_id={user.merchant_id}
          merchant_name={user.merchant_name}
        />
      </CardBody>

      <CardFooter className="flex justify-end gap-2 p-4">
        <Button size="sm" variant="ghost" onPress={() => openEditModalFor(user)}>
          Edit
        </Button>
        {userId !== user.user_id && (
          <Button
            color="danger"
            isLoading={deleteUserLoading}
            disabled={deleteUserLoading}
            onPress={() => {
              deleteUser(user.user_id!)
              onUpdated?.()
            }}
            size="sm"
          >
            Delete
          </Button>
        )}
      </CardFooter>

      <ReusableModalInputs<UserData>
        errors={editErrors}
        fields={editUserFields}
        formData={editFormData}
        isOpen={isEditModalOpen}
        mode="edit"
        schema={editUserSchema}
        setErrors={setEditErrors}
        submitting={updateUserLoading}
        title={`Edit User ${editingUserId ?? ''}`}
        onChange={patch => setEditFormData(prev => ({ ...prev, ...patch }))}
        onClose={handleCloseEditModal}
        onSubmit={handleEditUserSubmit}
      />
    </Card>
  )
}

export default UserCard
