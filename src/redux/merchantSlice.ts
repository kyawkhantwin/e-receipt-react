import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { MerchantResponseDto } from '../types/MerchantTypes'

interface MerchantState {
  selectedMerchant: MerchantResponseDto | null
}

const initialState: MerchantState = {
  selectedMerchant: null,
}

const merchantSlice = createSlice({
  name: 'merchant',
  initialState,
  reducers: {
    setSelectedMerchant: (state, action: PayloadAction<MerchantResponseDto | null>) => {
      state.selectedMerchant = action.payload
    },
  },
})

export const { setSelectedMerchant } = merchantSlice.actions
export default merchantSlice.reducer
