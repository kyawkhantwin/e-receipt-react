import { useRef, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { addToast } from '@heroui/toast'

import { useAuthToken } from '@/utils/useAuthToken'

const AuthRoutes = () => {
  const { hasToken, getAuthData } = useAuthToken()
  const { role } = getAuthData()
  const toastShown = useRef(false)

  useEffect(() => {
    if (hasToken && !toastShown.current) {
      const timer = setTimeout(() => {
        addToast({
          title: 'Access Denied',
          description: 'You are already logged in',
          color: 'danger',
        })
        toastShown.current = true
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [hasToken])

  if (!toastShown.current && role === 'cashier') {
    return <Navigate replace to="/home" />
  } else if (!toastShown.current && role === 'admin') {
    return <Navigate replace to="/merchants" />
  }
  return <Outlet />
}

export default AuthRoutes
