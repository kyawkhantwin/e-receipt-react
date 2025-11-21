import { useCallback, useEffect, useState } from 'react'

const TOKEN_KEY = 'token'
const MERCHANT_NAME_KEY = 'merchantName'
const MERCHANT_ADDRESS_KEY = 'merchantAddress'
const SERIAL = 'serial'
const ROLE = 'role'
const MERCHANT_ID_KEY = 'merchantId'
const APP_ID_KEY = 'appId'
const RECEIPT_ON_KEY = 'receiptOn'
const USER_ID_KEY = 'userId'

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

  interface AddTokenParams {
    token: string
    merchantName: string
    merchantAddress: string
    serial: string
    role: string
    merchantId: string
    appId: string
    receiptOn: string
    userId: string
  }

  const addToken = useCallback(
    ({ token, merchantName, merchantAddress, serial, role, merchantId, appId, receiptOn, userId }: AddTokenParams) => {
      localStorage.setItem(TOKEN_KEY, token)
      localStorage.setItem(MERCHANT_NAME_KEY, merchantName)
      localStorage.setItem(MERCHANT_ADDRESS_KEY, merchantAddress)
      localStorage.setItem(SERIAL, serial)
      localStorage.setItem(ROLE, role || '')
      localStorage.setItem(MERCHANT_ID_KEY, merchantId)
      localStorage.setItem(APP_ID_KEY, appId)
      localStorage.setItem(RECEIPT_ON_KEY, receiptOn)
      localStorage.setItem(USER_ID_KEY, userId)
      setHasToken(true)
    },
    []
  )

  const removeToken = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(MERCHANT_NAME_KEY)
    localStorage.removeItem(MERCHANT_ADDRESS_KEY)
    localStorage.removeItem(SERIAL)
    localStorage.removeItem(ROLE)
    localStorage.removeItem(MERCHANT_ID_KEY)
    localStorage.removeItem(APP_ID_KEY)
    localStorage.removeItem(RECEIPT_ON_KEY)
    localStorage.removeItem(USER_ID_KEY)
    setHasToken(false)
  }, [])

  const getAuthData = useCallback(() => {
    return {
      token: localStorage.getItem(TOKEN_KEY),
      merchantName: localStorage.getItem(MERCHANT_NAME_KEY),
      merchantAddress: localStorage.getItem(MERCHANT_ADDRESS_KEY),
      serial: localStorage.getItem(SERIAL),
      role: localStorage.getItem(ROLE),
      merchantId: localStorage.getItem(MERCHANT_ID_KEY),
      appId: localStorage.getItem(APP_ID_KEY),
      receiptOn: localStorage.getItem(RECEIPT_ON_KEY),
      userId: localStorage.getItem(USER_ID_KEY),
    }
  }, [])

  return { hasToken, addToken, removeToken, getAuthData }
}
