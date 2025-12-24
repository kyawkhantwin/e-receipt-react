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
