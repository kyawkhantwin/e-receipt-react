import React, { useState, FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserApi from '@/api/useUserApi'
import { useAuthToken } from '@/utils/useAuthToken'

interface CreateUserDto {
  username: string
  email: string
  firstName: string
  lastName: string
  password?: string
  merchantId: string
  createdBy: string
  serial: string
  role: string
  appId: string
  merchantAddress: string
  merchantName: string
}

const CreateUserPage: React.FC = () => {
  const navigate = useNavigate()
  const { getAuthData } = useAuthToken()
  const { merchantId, userId: createdBy, appId, merchantAddress, merchantName } = getAuthData()

  const { createUser, createUserLoading, createUserError, createUserData } = useUserApi()

  const [formData, setFormData] = useState<CreateUserDto>({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    merchantId: merchantId || '',
    createdBy: createdBy || '',
    serial: '',
    role: 'user', // Default role
    appId: appId || '',
    merchantAddress: merchantAddress || '',
    merchantName: merchantName || '',
  })

  useEffect(() => {
    if (createUserData) {
      alert('User created successfully!')
      navigate(`/merchants/${merchantId}`) // Redirect to merchant detail page after creation
    }
  }, [createUserData, navigate, merchantId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await createUser(formData)
    } catch (error) {
      console.error('Failed to create user:', error)
    }
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Create New User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="serial" className="block text-sm font-medium text-gray-700">
            Serial
          </label>
          <input
            type="text"
            name="serial"
            id="serial"
            value={formData.serial}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {createUserError && (
          <p className="text-sm text-red-500">Error: {createUserError.message}</p>
        )}
        <button
          type="submit"
          disabled={createUserLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
        >
          {createUserLoading ? 'Creating...' : 'Create User'}
        </button>
      </form>
    </div>
  )
}

export default CreateUserPage
