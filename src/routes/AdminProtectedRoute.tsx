import { useEffect, useRef } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { addToast } from '@heroui/toast'
import { useAuthToken } from '@/utils/useAuthToken'

const MerchantProtectedRoute = () => {
  const { getAuthData } = useAuthToken()
  const { role } = getAuthData()
  const toastShown = useRef(false)

  useEffect(() => {
    if (role !== 'admin' && !toastShown.current) {
      addToast({
        title: 'Unauthorized',
        description: 'You do not have permission to access this page.',
        color: 'danger',
      })
      toastShown.current = true
    }
  }, [role])

  if (role !== 'admin') {
    return <Navigate replace to="/" />
  }

  return <Outlet />
}

export default MerchantProtectedRoute
