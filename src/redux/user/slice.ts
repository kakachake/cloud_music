import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'
import Toast from '../../components/Toast'
import { checkLoginStatus } from '../../service/api/login'
import store from '../store'
import { UserAccountType, UserInfoType } from './userType'
interface UserState {
  userInfo: UserInfoType | null
  userAccount: UserAccountType | null
}

export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
  const { data } = await checkLoginStatus()

  if (data.code === 200) {
    return data
  } else {
    Toast.error('获取用户信息失败')
  }
})

const initialState: UserState = {
  userInfo: null,
  userAccount: null
}

export const userSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [getUserInfo.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload.profile
      state.userAccount = action.payload.account
    }
  }
})
