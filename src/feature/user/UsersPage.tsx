import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '@heroui/button'
import { Card } from '@heroui/card'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/modal'
import { Input } from '@heroui/input'
import useUserApi, { CreateUserDto, UpdateUserDto, User } from '../../api/useUserApi'
import { useAuthToken } from '@/utils/useAuthToken'

const UsersPage: React.FC = () => {
  const initialCreateFormState: CreateUserDto = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    merchantId: '',
    createdBy: '',
    serial: '',
    role: '',
    appId: '',
    merchantAddress: '',
    merchantName: '',
  }

  const initialEditFormState: UpdateUserDto = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    enabled: false,
    appId: '',
    merchantId: '',
    createdBy: '',
    serial: '',
    role: '',
    merchantAddress: '',
    merchantName: '',
  }

  const [createFormData, setCreateFormData] = useState<CreateUserDto>(initialCreateFormState)
  const [editFormData, setEditFormData] = useState<UpdateUserDto>(initialEditFormState)
  const { getAuthData } = useAuthToken()
  const { merchantId } = getAuthData()
  const {
    getAllMerchantUsers,
    getAllMerchantUsersLoading,
    getAllMerchantUsersError,
    getAllMerchantUsersData,
    deleteUser,
    deleteUserLoading,
    deleteUserError,
    createUser,
    createUserLoading,
    createUserError,
    updateUser,
    updateUserLoading,
    updateUserError,
  } = useUserApi()

  const [users, setUsers] = useState<User[]>([])

  const fetchUsersData = useCallback(async () => {
    await getAllMerchantUsers(merchantId!)
  }, [getAllMerchantUsers, merchantId])

  useEffect(() => {
    fetchUsersData()
  }, [fetchUsersData])

  useEffect(() => {
    if (getAllMerchantUsersData) {
      console.log('Fetched user data:', getAllMerchantUsersData)
      setUsers(getAllMerchantUsersData)
    }
  }, [getAllMerchantUsersData])

  const handleCreateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!merchantId) {
      console.error('Merchant ID is not available.')
      return
    }
    try {
      await createUser({ ...createFormData, merchantId, createdBy: getAuthData().userId! })
      handleCloseCreateModal()
      setCreateFormData(initialCreateFormState)
      fetchUsersData()
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  const handleEditUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUserId) {
      console.error('No user selected for editing.')
      return
    }
    try {
      await updateUser(editingUserId, editFormData)
      handleCloseEditModal()
      setEditFormData(initialEditFormState)
      fetchUsersData()
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingUserId, setEditingUserId] = useState<string | null>(null)

  const handleCreateUserClick = () => {
    setIsCreateModalOpen(true)
  }

  const handleEditUserClick = (userId: string) => {
    setEditingUserId(userId)
    const userToEdit = users.find(user => user.user_id === userId)
    if (userToEdit) {
      setEditFormData({
        username: userToEdit.username,
        firstName: userToEdit.firstName || '',
        lastName: userToEdit.lastName || '',
        enabled: userToEdit.enabled || false,
        appId: userToEdit.app_id || '',
        merchantId: userToEdit.merchant_id || '',
        createdBy: userToEdit.created_by || '',
        serial: userToEdit.serial || '',
        role: userToEdit.role || '',
        merchantAddress: userToEdit.merchant_address || '',
        merchantName: userToEdit.merchant_name || '',
      })
    }
    setIsEditModalOpen(true)
  }

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setEditingUserId(null)
  }

  const handleDeleteUserClick = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(userId)
      fetchUsersData() // Refresh the list after deletion
    }
  }

  if (getAllMerchantUsersLoading || deleteUserLoading || createUserLoading || updateUserLoading) {
    return <div className="p-4">Loading users...</div>
  }

  if (getAllMerchantUsersError || createUserError || updateUserError || deleteUserError) {
    return (
      <div className="p-4">
        Error:
        {getAllMerchantUsersError?.message ||
          createUserError?.message ||
          updateUserError?.message ||
          deleteUserError?.message}
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button onClick={handleCreateUserClick} className="rounded-md px-4 py-2">
          Create User
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map(user => (
          <Card key={user.id} className="p-4 shadow-md">
            <h2 className="text-xl font-semibold">{user.username}</h2>
            <p>serial: {user.serial}</p>
            <p>First Name: {user.firstName || 'N/A'}</p>
            <p>Last Name: {user.lastName || 'N/A'}</p>
            <p>Role: {user.role}</p>
            <p>Merchant Name: {user.merchant_name}</p>
            <p>Merchant ID: {user.merchant_id}</p>
            <p>App ID: {user.app_id}</p>
            <p>Enabled: {user.enabled ? 'Yes' : 'No'}</p>
            <div className="mt-4 flex justify-end space-x-2">
              <Button
                onClick={() => handleEditUserClick(user.user_id)}
                className="rounded-md px-3 py-1"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteUserClick(user.user_id)}
                className="rounded-md px-3 py-1"
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Create User Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal}>
        <ModalContent
          className={'max-h-[86vh] max-w-[90vw] overflow-y-scroll md:max-w-[55vw] lg:max-w-[35vw]'}
        >
          <ModalHeader>Create New User</ModalHeader>
          <ModalBody>
            <form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium">
                  Username
                </label>
                <Input
                  id="username"
                  value={createFormData.username}
                  onChange={e => setCreateFormData({ ...createFormData, username: e.target.value })}
                  className="mt-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={createFormData.email}
                  onChange={e => setCreateFormData({ ...createFormData, email: e.target.value })}
                  className="mt-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium">
                  First Name
                </label>
                <Input
                  id="firstName"
                  value={createFormData.firstName}
                  onChange={e =>
                    setCreateFormData({ ...createFormData, firstName: e.target.value })
                  }
                  className="mt-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  value={createFormData.lastName}
                  onChange={e => setCreateFormData({ ...createFormData, lastName: e.target.value })}
                  className="mt-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={createFormData.password || ''}
                  onChange={e => setCreateFormData({ ...createFormData, password: e.target.value })}
                  className="mt-1 w-full"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="serial" className="block text-sm font-medium">
                  Serial
                </label>
                <Input
                  id="serial"
                  value={createFormData.serial}
                  onChange={e => setCreateFormData({ ...createFormData, serial: e.target.value })}
                  className="mt-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-medium">
                  Role
                </label>
                <Input
                  id="role"
                  value={createFormData.role}
                  onChange={e => setCreateFormData({ ...createFormData, role: e.target.value })}
                  className="mt-1 w-full"
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCloseCreateModal} className="rounded-md px-4 py-2">
              Cancel
            </Button>
            <Button onClick={handleCreateUserSubmit} className="rounded-md px-4 py-2">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit User Modal */}
      <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
        <ModalContent
          className={'max-h-[86vh] max-w-[90vw] overflow-y-scroll md:max-w-[55vw] lg:max-w-[35vw]'}
        >
          <ModalHeader>Edit User {editingUserId}</ModalHeader>
          <ModalBody>
            <form>
              <div className="mb-4">
                <label htmlFor="editUsername" className="block text-sm font-medium">
                  Username
                </label>
                <Input
                  id="editUsername"
                  value={editFormData.username || ''}
                  onChange={e => setEditFormData({ ...editFormData, username: e.target.value })}
                  className="mt-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="editEmail" className="block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="editEmail"
                  type="email"
                  value={editFormData.email || ''}
                  onChange={e => setEditFormData({ ...editFormData, email: e.target.value })}
                  className="mt-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="editFirstName" className="block text-sm font-medium">
                  First Name
                </label>
                <Input
                  id="editFirstName"
                  value={editFormData.firstName || ''}
                  onChange={e => setEditFormData({ ...editFormData, firstName: e.target.value })}
                  className="mt-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="editLastName" className="block text-sm font-medium">
                  Last Name
                </label>
                <Input
                  id="editLastName"
                  value={editFormData.lastName || ''}
                  onChange={e => setEditFormData({ ...editFormData, lastName: e.target.value })}
                  className="mt-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="editEnabled" className="block text-sm font-medium">
                  Enabled
                </label>
                <input
                  type="checkbox"
                  id="editEnabled"
                  checked={editFormData.enabled || false}
                  onChange={e => setEditFormData({ ...editFormData, enabled: e.target.checked })}
                  className="mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="editAppId" className="block text-sm font-medium">
                  App ID
                </label>
                <Input
                  id="editAppId"
                  value={editFormData.appId || ''}
                  onChange={e => setEditFormData({ ...editFormData, appId: e.target.value })}
                  className="mt-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="editMerchantId" className="block text-sm font-medium">
                  Merchant ID
                </label>
                <Input
                  id="editMerchantId"
                  value={editFormData.merchantId || ''}
                  onChange={e => setEditFormData({ ...editFormData, merchantId: e.target.value })}
                  className="mt-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="editCreatedBy" className="block text-sm font-medium">
                  Created By
                </label>
                <Input
                  id="editCreatedBy"
                  value={editFormData.createdBy || ''}
                  onChange={e => setEditFormData({ ...editFormData, createdBy: e.target.value })}
                  className="mt-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="editSerial" className="block text-sm font-medium">
                  Serial
                </label>
                <Input
                  id="editSerial"
                  value={editFormData.serial || ''}
                  onChange={e => setEditFormData({ ...editFormData, serial: e.target.value })}
                  className="mt-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="editRole" className="block text-sm font-medium">
                  Role
                </label>
                <Input
                  id="editRole"
                  value={editFormData.role || ''}
                  onChange={e => setEditFormData({ ...editFormData, role: e.target.value })}
                  className="mt-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="editMerchantAddress" className="block text-sm font-medium">
                  Merchant Address
                </label>
                <Input
                  id="editMerchantAddress"
                  value={editFormData.merchantAddress || ''}
                  onChange={e =>
                    setEditFormData({ ...editFormData, merchantAddress: e.target.value })
                  }
                  className="mt-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="editMerchantName" className="block text-sm font-medium">
                  Merchant Name
                </label>
                <Input
                  id="editMerchantName"
                  value={editFormData.merchantName || ''}
                  onChange={e => setEditFormData({ ...editFormData, merchantName: e.target.value })}
                  className="mt-1 w-full"
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCloseEditModal} className="rounded-md px-4 py-2">
              Cancel
            </Button>
            <Button onClick={handleEditUserSubmit} className="rounded-md px-4 py-2">
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default UsersPage
