import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody } from '@heroui/card'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'
import { useNavigate } from 'react-router-dom'
import { addToast } from '@heroui/toast'

import DefaultLayout from '@/layouts/default.tsx'

import { useResetPasswordApi } from '@/api/useResetPasswordApi'
import useErrorToasts from '@/components/useErrorToasts.ts'
import { useAuthToken } from '@/utils/useAuthToken'

function ResetPasswordPage() {
  const { getAuthData } = useAuthToken()
  const { userId } = getAuthData()
  const navigate = useNavigate()

  if (!userId) {
    addToast({
      title: 'Missing requirement ',
      color: 'success',
    })
    navigate('/login')
    return
  }

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { showErrorToasts } = useErrorToasts()
  const { resetPassword, isSuccess, isError, errorData } = useResetPasswordApi()

  useEffect(() => {
    if (isError) {
      showErrorToasts(errorData)
    }
  }, [isError, errorData])

  useEffect(() => {
    if (isSuccess) {
      addToast({
        title: 'Password reset successfully',
        color: 'success',
      })
      navigate('/')
    }
  }, [isSuccess, navigate])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      addToast({
        title: 'Passwords do not match',
        color: 'danger',
      })
      return
    }

    await resetPassword(userId, password)
  }

  return (
    <DefaultLayout>
      <div className="flex min-h-[57vh] flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        <Card className="w-full max-w-md rounded-2xl p-6 sm:p-8">
          <CardHeader className="mb-6 flex justify-center p-0">
            <h2 className="text-center text-2xl font-bold tracking-wide">Reset Password</h2>
          </CardHeader>
          <CardBody>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="w-full">
                <label className="mb-1 block text-sm font-medium">New Password</label>
                <Input
                  required
                  type="password"
                  className="w-full rounded-lg text-base focus:ring-2 focus:outline-none"
                  placeholder="Enter your new password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="mb-1 block text-sm font-medium">Confirm New Password</label>
                <Input
                  required
                  type="password"
                  className="w-full rounded-lg text-base focus:ring-2 focus:outline-none"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>
              <div>
                <Button
                  className="w-full rounded-xl py-3 text-lg font-semibold shadow-md transition-all focus:ring-2 focus:outline-none"
                  color="primary"
                  type="submit"
                >
                  Reset Password
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </DefaultLayout>
  )
}

export default ResetPasswordPage
