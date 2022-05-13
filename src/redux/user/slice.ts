import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'
import Toast from '../../components/Toast'
import { checkLoginStatus, getUserPlayList } from '../../service/api/login'
import store from '../store'
import { UserAccountType, UserInfoType } from './userType'
interface UserState {
  userInfo: UserInfoType | null
  userAccount: UserAccountType | null
  userPlayList: any[]
  userLikeList: any[]
}

export const getLikeList = createAsyncThunk('user/getLikeList', async (userId: string) => {
  console.log(111)

  const { playlist } = await getUserPlayList(userId)

  return playlist
})

export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
  const { data } = await checkLoginStatus()

  if (data.code === 200) {
    console.log(111)
    store.dispatch(getLikeList(data.profile.userId))
    return data
  } else {
    Toast.error('获取用户信息失败')
  }
})

const initialState: UserState = {
  userInfo: null,
  userAccount: null,
  userPlayList: [],
  userLikeList: []
}

export const userSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [getUserInfo.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload.profile
      state.userAccount = action.payload.account
    },
    [getLikeList.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.userPlayList = action.payload?.filter(
        (item: { userId: any }) => item.userId === state.userInfo?.userId
      )
      state.userLikeList = action.payload?.filter(
        (item: { userId: any }) => item.userId !== state.userInfo?.userId
      )
    }
  }
})
