import { useCallback, useEffect, useState } from 'react'

const TOKEN_KEY = 'token'
const MERCHANT_NAME_KEY = 'merchantName'
const MERCHANT_ADDRESS_KEY = 'merchantAddress'

export const useAuthToken = () => {
  const [hasToken, setHasToken] = useState<boolean>(() => {
    return !!localStorage.getItem(TOKEN_KEY)
  })

  useEffect(() => {
    const handleStorageChange = () => {
      setHasToken(!!localStorage.getItem(TOKEN_KEY))
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const addToken = useCallback((token: string, merchantName: string, merchantAddress: string) => {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(MERCHANT_NAME_KEY, merchantName)
    localStorage.setItem(MERCHANT_ADDRESS_KEY, merchantAddress)
    setHasToken(true)
  }, [])

  const removeToken = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(MERCHANT_NAME_KEY)
    localStorage.removeItem(MERCHANT_ADDRESS_KEY)
    setHasToken(false)
  }, [])

  const getAuthData = useCallback(() => {
    return {
      token: localStorage.getItem(TOKEN_KEY),
      merchantName: localStorage.getItem(MERCHANT_NAME_KEY),
      merchantAddress: localStorage.getItem(MERCHANT_ADDRESS_KEY),
    }
  }, [])

  return { hasToken, addToken, removeToken, getAuthData }
}
