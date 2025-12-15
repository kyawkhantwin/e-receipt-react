import React, { useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card'
import { Chip } from '@heroui/chip'
import { Button } from '@heroui/button'

import { editAdminUserSchema } from '../schema/editUserSchema'
import { AdminEditUserData } from '../type/UserData'

import ReusableModalInputs from '@/components/ResuableModelInputs'
import useUserApi from '@/api/useUserApi'
import { editAdminUserFields } from '../type/editUserFields'

export type KeycloakUserAccess = {
  manage: boolean
}

export type KeycloakUser = {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  emailVerified: boolean
  createdTimestamp: number
  enabled: boolean
  totp: boolean
  disableableCredentialTypes: string[]
  requiredActions: string[]
  notBefore: number
  access: KeycloakUserAccess
  roles: string[]
}

interface UserCardProps {
  user: KeycloakUser
  onUpdated?: () => void
}

export const AdminUserCard: React.FC<UserCardProps> = ({ user, onUpdated }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingUserId, setEditingUserId] = useState<string | null>(null)
  const [editFormData, setEditFormData] = useState<AdminEditUserData>({} as AdminEditUserData)
  const [editErrors, setEditErrors] = useState<Record<string, string>>({})
  const { updateUser, updateUserLoading, getAllMerchantUsers, deleteUser, deleteUserLoading } =
    useUserApi()

  function openEditModalFor(userData: KeycloakUser) {
    setEditingUserId(String(userData.id))
    setEditFormData({
      username: userData.username ?? '',
      email: userData.email ?? '',
      firstName: userData.firstName ?? '',
      lastName: userData.lastName ?? '',
      enabled: Boolean(true),
      role: userData.roles[0] ?? '',
    })
    setEditErrors({})
    setIsEditModalOpen(true)
  }

  async function handleEditUserSubmit() {
    await updateUser(editingUserId!, editFormData)
    await getAllMerchantUsers()
    setIsEditModalOpen(false)
    setEditingUserId(null)
    setEditFormData({} as AdminEditUserData)
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
          <h2 className="text-lg font-semibold">{user.id}</h2>
        </div>

        <Chip color="success" size="sm" variant="bordered">
          {user.roles[0].toUpperCase()}
        </Chip>
      </CardHeader>

      <CardBody className="space-y-3 p-4 text-sm"></CardBody>

      <CardFooter className="flex justify-end gap-2 p-4">
        <Button size="sm" variant="ghost" onPress={() => openEditModalFor(user)}>
          Edit
        </Button>
        <Button
          color="danger"
          isLoading={deleteUserLoading}
          disabled={deleteUserLoading}
          onPress={() => {
            deleteUser(user.id!)
            onUpdated?.()
          }}
          size="sm"
        >
          Delete
        </Button>
      </CardFooter>

      <ReusableModalInputs<AdminEditUserData>
        errors={editErrors}
        fields={editAdminUserFields}
        formData={editFormData}
        isOpen={isEditModalOpen}
        mode="edit"
        schema={editAdminUserSchema}
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

export default AdminUserCard
