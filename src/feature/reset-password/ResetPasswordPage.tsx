import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody } from '@heroui/card'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'
import { useNavigate } from 'react-router-dom'
import { addToast } from '@heroui/toast'
import { EyeClosedIcon, EyeIcon } from 'lucide-react'

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
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { showErrorToasts } = useErrorToasts()
  const { resetPassword, isSuccess, isError, errorData, isLoading } = useResetPasswordApi()

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
                <div className="relative">
                  <Input
                    required
                    placeholder="Enter your new password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <button
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeClosedIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="w-full">
                <label className="mb-1 block text-sm font-medium">Confirm New Password</label>
                <div className="relative">
                  <Input
                    required
                    placeholder="Confirm your new password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                  <button
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeClosedIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <Button
                  className="w-full rounded-xl py-3 text-lg font-semibold shadow-md transition-all focus:ring-2 focus:outline-none"
                  color="primary"
                  isLoading={isLoading}
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
