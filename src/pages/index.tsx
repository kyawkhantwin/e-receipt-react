import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody } from '@heroui/card'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'
import { useNavigate } from 'react-router-dom'
import { addToast } from '@heroui/toast'
import { Eye, EyeOff } from 'lucide-react'

import DefaultLayout from '@/layouts/default.tsx'
import { useAuthToken } from '@/utils/useAuthToken.tsx'
import useAxiosApi from '@/api/useAxiosApi'
import { ApiConfig } from '@/config/apiConfig.ts'
import useErrorToasts from '@/components/useErrorToasts.ts'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { showErrorToasts } = useErrorToasts()
  const { trigger, isSuccess, isError, data, errorData } = useAxiosApi()
  const toggleVisibility = () => setShowPassword(!showPassword)

  const { addToken } = useAuthToken()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      showErrorToasts(errorData)
    }
  }, [isError, errorData])

  useEffect(() => {
    if (isSuccess) {
      addToken(data?.token, data?.merchantName, data?.merchantAddress)

      addToast({
        title: 'Login Successful',
        color: 'success',
      })
      navigate('/home')
    }
  }, [isSuccess, data])

  const isValidPin = (value: string) => /^\d{6}$/.test(value)

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    if (passwordError && isValidPin(value)) {
      setPasswordError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValidPin(password)) {
      setPasswordError('Password must be a 6-digit.')

      return
    }
    setPasswordError('')
    await trigger({
      endPoint: ApiConfig.auth,
      method: 'post',
      body: {
        serial: username,
        pin: password,
      },
    })
  }

  return (
    <DefaultLayout>
      <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 sm:px-6 md:px-8">
        <Card className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
          <CardHeader className="mb-6 flex justify-center p-0">
            <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">Login</h2>
          </CardHeader>
          <CardBody>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="w-full">
                <label className="mb-1 block text-sm font-medium text-gray-700">Username</label>
                <Input
                  required
                  className="w-full rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className="relative w-full">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Password (6-digit PIN)
                </label>
                <Input
                  required
                  className="w-full rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  endContent={
                    <button
                      aria-label="toggle password visibility"
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                  }
                  errorMessage={passwordError}
                  isInvalid={!!passwordError}
                  placeholder="Enter 6-digit PIN"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => handlePasswordChange(e.target.value)}
                />
              </div>
              <div>
                <Button
                  className="w-full rounded-xl bg-indigo-600 py-3 text-lg font-semibold text-white shadow-md transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  color="primary"
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </DefaultLayout>
  )
}

export default LoginPage
