import React, { useState } from 'react'
import { Button } from '@heroui/button'

import ReusableModalInputs from '@/components/ResuableModelInputs'
import useUserApi, { CreateUserDto } from '@/api/useUserApi'
import { createCashierUserFields } from '@/feature/user/type/createUserFields'
import { createCashierSchema } from '@/feature/user/schema/createUserSchema'
import { addToast } from '@heroui/toast'
import { useAuthToken } from '@/utils/useAuthToken'

interface UserPageHeaderProps {
  fetchUsersData: () => void
  role: string
  terminalSerials: string[]
}

const UserForMerchantCreation: React.FC<UserPageHeaderProps> = ({
  fetchUsersData,
  role,
  terminalSerials,
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const [createErrors, setCreateErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const { getAuthData } = useAuthToken()
  const { merchantAddress, merchantId, merchantName } = getAuthData()
  if (!getAuthData) {
    return <p>404</p>
  }

  const initialCreateFormState: CreateUserDto = {
    username: '',
    password: '',
    serial: '',
    role: role,
    merchantId: merchantId!,
    merchantAddress: merchantAddress!,
    merchantName: merchantName!,
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

      <ReusableModalInputs<CreateUserDto>
        errors={createErrors}
        fields={createCashierUserFields(terminalSerials)}
        formData={createFormData}
        isOpen={isCreateModalOpen}
        mode="create"
        schema={createCashierSchema}
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

export default UserForMerchantCreation
