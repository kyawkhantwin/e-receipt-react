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
  const [serial, setSerial] = useState('')
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
        serial: serial,
        pin: password,
      },
    })
  }

  return (
    <DefaultLayout>
      <div className="flex min-h-[57vh] flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        <Card className="w-full max-w-md rounded-2xl p-6 sm:p-8">
          <CardHeader className="mb-6 flex justify-center p-0">
            <h2 className="text-center text-2xl font-bold tracking-wide">Login</h2>
          </CardHeader>
          <CardBody>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="w-full">
                <label className="mb-1 block text-sm font-medium">Serail Number</label>
                <Input
                  required
                  className="w-full rounded-lg text-base focus:ring-2 focus:outline-none"
                  placeholder="Enter Serial number"
                  value={serial}
                  onChange={e => setSerial(e.target.value)}
                />
              </div>
              <div className="relative mt-5 w-full">
                <label className="mb-1 block text-sm font-medium">Password (6-digit PIN)</label>
                <Input
                  required
                  className="w-full rounded-lg text-base focus:ring-2 focus:outline-none"
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
                  className="w-full rounded-xl py-3 text-lg font-semibold shadow-md transition-all focus:ring-2 focus:outline-none"
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
      <div className="mb-10 flex flex-col items-center justify-center gap-3">
        <img src="/mmqr.png" alt="mmqr" width={50} />
        <p className="text-bold text-sm">Now with MMQR</p>
      </div>
    </DefaultLayout>
  )
}

export default LoginPage
