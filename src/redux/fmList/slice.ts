import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface MusicListState {
  list: any[]
  current: number
}

const initialState: MusicListState = {
  list: [],
  current: -1
}

export const fmListSlice = createSlice({
  name: 'fmList',
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<any[]>) => {
      state.list = [...state.list, ...action.payload]
      state.current === -1 && (state.current = 0)
    },
    setCurrent: (state, action: PayloadAction<number>) => {
      state.current = action.payload
    },
    addSongToPlayList: (state, action: PayloadAction<any>) => {
      state.list.splice(state.current, 0, action.payload)
      state.current++
    },
    clearList: (state) => {
      state.list = []
      state.current = -1
    }
  }
})
