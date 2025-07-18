// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import transactionDetailReducer from './transactionSlice'

export const store = configureStore({
  reducer: {
    transactionDetail: transactionDetailReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
