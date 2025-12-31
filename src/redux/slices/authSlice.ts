import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  token: string | null
  refreshToken: string | null
  merchantName: string | null
  merchantAddress: string | null
  merchantAddress2: string | null | undefined
  merchantAddress3: string | null | undefined
  serial: string | null
  role: string | null
  merchantId: string | null
  appId: string | null
  receiptOn: string | null
  userId: string | null
  terminalName: string | null | undefined
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  merchantName: localStorage.getItem('merchantName'),
  merchantAddress: localStorage.getItem('merchantAddress'),
  merchantAddress2: localStorage.getItem('merchantAddress2'),
  merchantAddress3: localStorage.getItem('merchantAddress3'),
  serial: localStorage.getItem('serial'),
  role: localStorage.getItem('role'),
  merchantId: localStorage.getItem('merchantId'),
  appId: localStorage.getItem('appId'),
  receiptOn: localStorage.getItem('receiptOn'),
  userId: localStorage.getItem('userId'),
  terminalName: localStorage.getItem('terminalName'),
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
      state.merchantAddress2 = action.payload.merchantAddress2
      state.merchantAddress3 = action.payload.merchantAddress3
      state.serial = action.payload.serial
      state.role = action.payload.role
      state.merchantId = action.payload.merchantId
      state.appId = action.payload.appId
      state.receiptOn = action.payload.receiptOn
      state.userId = action.payload.userId
      state.terminalName = action.payload.terminalName

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
      if (action.payload.merchantAddress2) {
        localStorage.setItem('merchantAddress2', action.payload.merchantAddress2)
      } else {
        localStorage.removeItem('merchantAddress2')
      }
      if (action.payload.merchantAddress3) {
        localStorage.setItem('merchantAddress3', action.payload.merchantAddress3)
      } else {
        localStorage.removeItem('merchantAddress3')
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
      if (action.payload.terminalName) {
        localStorage.setItem('terminalName', action.payload.terminalName)
      } else {
        localStorage.removeItem('terminalName')
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
      state.merchantAddress2 = null
      state.merchantAddress3 = null
      state.terminalName = null

      // Clear localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('merchantName')
      localStorage.removeItem('merchantAddress')
      localStorage.removeItem('merchantAddress2')
      localStorage.removeItem('merchantAddress3')
      localStorage.removeItem('serial')
      localStorage.removeItem('role')
      localStorage.removeItem('merchantId')
      localStorage.removeItem('appId')
      localStorage.removeItem('receiptOn')
      localStorage.removeItem('terminalName')
      localStorage.removeItem('userId')
    },
  },
})

export const { setAuthData, clearAuthData } = authSlice.actions
export default authSlice.reducer
