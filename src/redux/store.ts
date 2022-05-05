import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { musicControlSlice } from './musicControl/slice'
import { musicListSlice } from './musicList/slice'
import { userSlice } from './user/slice'
import musicInstance from '../controller/musicPlayer'
const rootReducer = combineReducers({
  musicControl: musicControlSlice.reducer,
  musicList: musicListSlice.reducer,
  user: userSlice.reducer
})

const store = configureStore({
  reducer: rootReducer,
  devTools: true
})

musicInstance.init(store)

export type Store = typeof store

export type RootState = ReturnType<typeof store.getState> //返回当前state存储的变量类型

export default store
