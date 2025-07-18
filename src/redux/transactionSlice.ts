import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TransactionType } from '@/types/TransactionType'

interface TransactionState {
  selectedTransaction: TransactionType | null
}

const initialState: TransactionState = {
  selectedTransaction: null,
}

const transactionDetailSlice = createSlice({
  name: 'transactionDetail',
  initialState,
  reducers: {
    setTransaction: (state, action: PayloadAction<TransactionType>) => {
      state.selectedTransaction = action.payload
    },
    clearTransaction: state => {
      state.selectedTransaction = null
    },
  },
})

export const { setTransaction, clearTransaction } = transactionDetailSlice.actions
export default transactionDetailSlice.reducer
