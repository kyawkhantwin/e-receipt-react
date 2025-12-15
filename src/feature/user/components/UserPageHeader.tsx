import React, { useState } from 'react'
import { Button } from '@heroui/button'

import ReusableModalInputs from '@/components/ResuableModelInputs'
import useUserApi, { CreateAdminUserDto, CreateUserDto } from '@/api/useUserApi'
import { createAdminUserFields, createUserFields } from '@/feature/user/type/createUserFields'
import { createAdminUserSchema, createUserSchema } from '@/feature/user/schema/createUserSchema'
import { useAppSelector } from '@/redux/store'

interface UserPageHeaderProps {
  fetchUsersData: () => void
  role: string
}

const UserPageHeader: React.FC<UserPageHeaderProps> = ({ fetchUsersData, role }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const [createErrors, setCreateErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const initialCreateFormState: CreateAdminUserDto = {
    username: '',
    password: '',
    role: role,
  }

  const [createFormData, setCreateFormData] = useState<CreateAdminUserDto>(initialCreateFormState)
  const { createUser } = useUserApi()

  async function handleCreateUserSubmit() {
    setSubmitting(true)
    await createUser(createFormData)

    setSubmitting(false)
    setIsCreateModalOpen(false)
    setCreateFormData(initialCreateFormState)
    setCreateErrors({})
    fetchUsersData()
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
