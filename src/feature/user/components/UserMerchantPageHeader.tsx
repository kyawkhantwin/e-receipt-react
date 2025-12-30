import React, { useState } from 'react'
import { Button } from '@heroui/button'

import ReusableModalInputs from '@/components/ResuableModelInputs'
import useUserApi, { CreateAdminUserDto, CreateUserDto } from '@/api/useUserApi'
import { createAdminUserFields } from '@/feature/user/type/createUserFields'
import { createAdminUserSchema } from '@/feature/user/schema/createUserSchema'
import { useAppSelector } from '@/redux/store'
import { addToast } from '@heroui/toast'

interface UserPageHeaderProps {
  fetchUsersData: () => void
  role: string
}

const UserPageHeader: React.FC<UserPageHeaderProps> = ({ fetchUsersData, role }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const [createErrors, setCreateErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const selectedMerchant = useAppSelector(state => state.merchant.selectedMerchant)
  if (!selectedMerchant) {
    return <p>404</p>
  }

  const initialCreateFormState: CreateUserDto = {
    username: '',
    password: '',

    role: role,
    merchantId: selectedMerchant?.id!,
    merchantAddress: selectedMerchant?.address!,
    merchantName: selectedMerchant?.name!,
    appId: 'app-1',
    createdBy: 'gg',
  }

  const [createFormData, setCreateFormData] = useState<CreateUserDto>(initialCreateFormState)
  const { createUser } = useUserApi()

  async function handleCreateUserSubmit() {
    setSubmitting(true)
    try {
      await createUser(createFormData)
      setIsCreateModalOpen(false)
      setCreateFormData(initialCreateFormState)
      setCreateErrors({})
      fetchUsersData()
    } catch (error: any) {
      addToast({
        title: error.response?.data?.message || 'Failed to create user',
        color: 'danger',
      })
      // Optionally, set an error message in the UI
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mb-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Manage Users</h1>

      <Button onPress={() => setIsCreateModalOpen(true)}>Create User</Button>

      <ReusableModalInputs<CreateAdminUserDto>
        errors={createErrors}
        fields={createAdminUserFields}
        formData={createFormData}
        isOpen={isCreateModalOpen}
        mode="create"
        schema={createAdminUserSchema}
        setErrors={setCreateErrors}
        submitting={submitting}
        title="Create User"
        onChange={patch => setCreateFormData(prev => ({ ...prev, ...patch }))}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateUserSubmit}
      />
    </div>
  )
}

export default UserPageHeader
