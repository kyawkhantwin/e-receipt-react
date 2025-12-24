import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  token: string | null
  refreshToken: string | null
  merchantName: string | null
  merchantAddress: string | null
  serial: string | null
  role: string | null
  merchantId: string | null
  appId: string | null
  receiptOn: string | null
  userId: string | null
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  merchantName: localStorage.getItem('merchantName'),
  merchantAddress: localStorage.getItem('merchantAddress'),
  serial: localStorage.getItem('serial'),
  role: localStorage.getItem('role'),
  merchantId: localStorage.getItem('merchantId'),
  appId: localStorage.getItem('appId'),
  receiptOn: localStorage.getItem('receiptOn'),
  userId: localStorage.getItem('userId'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
      state.merchantName = action.payload.merchantName
      state.merchantAddress = action.payload.merchantAddress
      state.serial = action.payload.serial
      state.role = action.payload.role
      state.merchantId = action.payload.merchantId
      state.appId = action.payload.appId
      state.receiptOn = action.payload.receiptOn
      state.userId = action.payload.userId

      // Update localStorage
      if (action.payload.token) {
        localStorage.setItem('token', action.payload.token)
      } else {
        localStorage.removeItem('token')
      }
      if (action.payload.refreshToken) {
        localStorage.setItem('refreshToken', action.payload.refreshToken)
      } else {
        localStorage.removeItem('refreshToken')
      }
      if (action.payload.merchantName) {
        localStorage.setItem('merchantName', action.payload.merchantName)
      } else {
        localStorage.removeItem('merchantName')
      }
      if (action.payload.merchantAddress) {
        localStorage.setItem('merchantAddress', action.payload.merchantAddress)
      } else {
        localStorage.removeItem('merchantAddress')
      }
      if (action.payload.serial) {
        localStorage.setItem('serial', action.payload.serial)
      } else {
        localStorage.removeItem('serial')
      }
      if (action.payload.role) {
        localStorage.setItem('role', action.payload.role)
      } else {
        localStorage.removeItem('role')
      }
      if (action.payload.merchantId) {
        localStorage.setItem('merchantId', action.payload.merchantId)
      } else {
        localStorage.removeItem('merchantId')
      }
      if (action.payload.appId) {
        localStorage.setItem('appId', action.payload.appId)
      } else {
        localStorage.removeItem('appId')
      }
      if (action.payload.receiptOn) {
        localStorage.setItem('receiptOn', action.payload.receiptOn)
      } else {
        localStorage.removeItem('receiptOn')
      }
      if (action.payload.userId) {
        localStorage.setItem('userId', action.payload.userId)
      } else {
        localStorage.removeItem('userId')
      }
    },
    clearAuthData: state => {
      state.token = null
      state.refreshToken = null
      state.merchantName = null
      state.merchantAddress = null
      state.serial = null
      state.role = null
      state.merchantId = null
      state.appId = null
      state.receiptOn = null
      state.userId = null

      // Clear localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('merchantName')
      localStorage.removeItem('merchantAddress')
      localStorage.removeItem('serial')
      localStorage.removeItem('role')
      localStorage.removeItem('merchantId')
      localStorage.removeItem('appId')
      localStorage.removeItem('receiptOn')
      localStorage.removeItem('userId')
    },
  },
})

export const { setAuthData, clearAuthData } = authSlice.actions
export default authSlice.reducer
