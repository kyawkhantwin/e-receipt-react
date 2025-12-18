// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import transactionDetailReducer from './transactionSlice'
import merchantReducer from './merchantSlice'
import terminalReducer from './slices/terminalSlice'

export const store = configureStore({
  reducer: {
    transactionDetail: transactionDetailReducer,
    merchant: merchantReducer,
    terminal: terminalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
