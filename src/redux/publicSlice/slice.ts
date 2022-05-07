import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'
import Toast from '../../components/Toast'
import { checkLoginStatus } from '../../service/api/login'
import store from '../store'

type SideType = 'playList' | 'message' | ''

interface PublicState {
  curSideOpen: SideType
}

const initialState: PublicState = {
  curSideOpen: ''
}

export const publicSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    setCurSideOpen(state, action: PayloadAction<SideType>) {
      if (state.curSideOpen === action.payload) {
        state.curSideOpen = ''
      } else {
        state.curSideOpen = action.payload
      }
    }
  }
})

window.addEventListener('click', (e: any) => {
  console.log(e.path)
  //查询是否点击到了侧边栏
  const sideBar = document.querySelector('#rightSideBar')
  const musicBar = document.querySelector('#musicBar')
  if (e.path.includes(sideBar) || e.path.includes(musicBar)) {
  } else {
    store.dispatch(publicSlice.actions.setCurSideOpen(''))
  }
})
