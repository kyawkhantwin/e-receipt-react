import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setAuthData, clearAuthData } from '../redux/slices/authSlice'
import { useAppSelector } from '../redux/store'

export const useAuthToken = () => {
  const dispatch = useDispatch()
  const authState = useAppSelector(state => state.auth)
  const hasToken = !!authState.token

  interface AddTokenParams {
    token: string
    refreshToken: string
    merchantName: string
    merchantAddress: string
    merchantAddress2?: string
    merchantAddress3?: string
    serial: string
    role: string
    merchantId: string
    appId: string
    receiptOn: string
    userId: string
  }

  const addToken = useCallback(
    ({
      token,
      refreshToken,
      merchantName,
      merchantAddress,
      merchantAddress2,
      merchantAddress3,
      serial,
      role,
      merchantId,
      appId,
      receiptOn,
      userId,
    }: AddTokenParams) => {
      dispatch(
        setAuthData({
          token,
          refreshToken,
          merchantName,
          merchantAddress,
          merchantAddress2,
          merchantAddress3,
          serial,
          role,
          merchantId,
          appId,
          receiptOn,
          userId,
        })
      )
    },
    [dispatch]
  )

  const removeToken = useCallback(() => {
    dispatch(clearAuthData())
  }, [dispatch])

  const getAuthData = useCallback(() => {
    return {
      token: authState.token,
      refreshToken: authState.refreshToken,
      merchantName: authState.merchantName,
      merchantAddress: authState.merchantAddress,
      merchantAddress2: authState.merchantAddress2,
      merchantAddress3: authState.merchantAddress3,
      serial: authState.serial,
      role: authState.role,
      merchantId: authState.merchantId,
      appId: authState.appId,
      receiptOn: authState.receiptOn,
      userId: authState.userId,
    }
  }, [authState])

  return { hasToken, addToken, removeToken, getAuthData }
}
