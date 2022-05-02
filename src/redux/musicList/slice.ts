import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'

interface MusicListState {
  list: any[]
  current: number
}

const initialState: MusicListState = {
  list: [],
  current: 0
}

export const musicListSlice = createSlice({
  name: 'musicList',
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<any[]>) => {
      state.list = action.payload
    },
    setCurrent: (state, action: PayloadAction<number>) => {
      state.current = action.payload
    }
  }
})
