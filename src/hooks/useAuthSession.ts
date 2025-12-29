import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToast } from '@heroui/toast'
import { useAuthToken } from '../utils/useAuthToken'
import { refreshToken } from '../api/authService'
import { setAuthData } from '../redux/slices/authSlice'

const REFRESH_INTERVAL = 60 * 1000
const INACTIVITY_TIMEOUT = 5 * 60 * 1000
export const useAuthSession = () => {
  const { hasToken, removeToken, getAuthData } = useAuthToken()
  const lastActivityTime = useRef(Date.now())
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const updateLastActivityTime = () => {
    lastActivityTime.current = Date.now()
  }

  const logoutAndNavigate = (message: string) => {
    removeToken()
    navigate('/home')
    addToast({
      title: 'Session Expired',
      description: message,
      color: 'danger',
    })
  }

  useEffect(() => {
    window.addEventListener('mousemove', updateLastActivityTime)
    window.addEventListener('keydown', updateLastActivityTime)
    window.addEventListener('click', updateLastActivityTime)
    window.addEventListener('scroll', updateLastActivityTime)

    return () => {
      window.removeEventListener('mousemove', updateLastActivityTime)
      window.removeEventListener('keydown', updateLastActivityTime)
      window.removeEventListener('click', updateLastActivityTime)
      window.removeEventListener('scroll', updateLastActivityTime)
    }
  }, [])

  useEffect(() => {
    let refreshInterval: NodeJS.Timeout
    if (hasToken) {
      refreshInterval = setInterval(async () => {
        const now = Date.now()
        const timeSinceLastActivity = now - lastActivityTime.current

        if (timeSinceLastActivity < INACTIVITY_TIMEOUT) {
          try {
            const authData = getAuthData()

            if (authData.token && authData.refreshToken) {
              const response = await refreshToken(authData.refreshToken)
              dispatch(
                setAuthData({
                  ...authData,
                  token: response.token,
                  refreshToken: response.refreshToken,
                })
              )
            }
          } catch (error) {
            logoutAndNavigate('Failed to refresh token. Please log in again.')
          }
        } else {
          logoutAndNavigate('You have been logged out due to inactivity.')
        }
      }, REFRESH_INTERVAL)
    }

    return () => {
      clearInterval(refreshInterval)
    }
  }, [hasToken, removeToken, getAuthData, dispatch, navigate])
}
