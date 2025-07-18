// routes/ProtectedRoute.tsx
import { useEffect, useRef } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { addToast } from '@heroui/toast'

import { useAuthToken } from '@/utils/useAuthToken'

const ProtectedRoute = () => {
  const { hasToken } = useAuthToken()
  const toastShown = useRef(false)

  useEffect(() => {
    if (!hasToken && !toastShown.current) {
      addToast({
        title: 'Unauthorized',
        description: 'Please log in',
        color: 'danger',
      })
      toastShown.current = true
    }
  }, [hasToken])

  if (!hasToken) {
    return <Navigate replace to="/" />
  }

  return <Outlet />
}

export default ProtectedRoute
