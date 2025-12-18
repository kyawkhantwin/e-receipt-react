import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Terminal {
  id: string
  serial: string
  terminalId: string
  status: string
  merchantId: string
  createdAt: string
  updatedAt: string
}

interface TerminalState {
  terminals: Terminal[]
}

const initialState: TerminalState = {
  terminals: [],
}

const terminalSlice = createSlice({
  name: 'terminal',
  initialState,
  reducers: {
    setTerminals: (state, action: PayloadAction<Terminal[]>) => {
      state.terminals = action.payload
    },
  },
})

export const { setTerminals } = terminalSlice.actions
export default terminalSlice.reducer