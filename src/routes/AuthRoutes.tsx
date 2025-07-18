import { useRef, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { addToast } from '@heroui/toast'

import { useAuthToken } from '@/utils/useAuthToken'

const AuthRoutes = () => {
  const { hasToken } = useAuthToken()
  const toastShown = useRef(false)

  useEffect(() => {
    if (hasToken && !toastShown.current) {
      addToast({
        title: 'Access Denied',
        description: 'You are already logged in',
        color: 'danger',
      })
      toastShown.current = true
    }
  }, [hasToken])

  if (hasToken) {
    return <Navigate replace to="/home" />
  }

  return <Outlet />
}

export default AuthRoutes
