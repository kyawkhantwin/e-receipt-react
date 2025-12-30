import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Terminal {
  id: string
  serial: string
  terminalId: string
  status: string
  merchantId: string
  address: string | null
  address2: string | null
  address3: string | null
  name: string
  appId: string | null
  tid: string | null
  mid: string[]
  merchantName?: string
  totalAmount: number
  totalTransactions: number
}

interface TerminalState {
  terminals: Terminal[]
  selectedTerminal: Terminal | null
}

const initialState: TerminalState = {
  terminals: [],
  selectedTerminal: null,
}

const terminalSlice = createSlice({
  name: 'terminal',
  initialState,
  reducers: {
    setTerminals: (state, action: PayloadAction<Terminal[]>) => {
      state.terminals = action.payload
    },
    setSelectedTerminal: (state, action: PayloadAction<Terminal | null>) => {
      state.selectedTerminal = action.payload
    },
  },
})

export const { setTerminals, setSelectedTerminal } = terminalSlice.actions
export default terminalSlice.reducer
