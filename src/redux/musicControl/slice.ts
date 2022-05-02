import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'
import musicInstance from '../../controller/musicPlayer'

export interface MusicControlState {
  isPlaying: boolean
  isLoading: boolean
  isError: boolean
  error: string | null
  currentTime: number
  duration: number
  progress: number
  volume: number
  musicInfo: any
  canplay: boolean
  isAdjusting: boolean
  bufferProgress: number
  isMute: boolean
}

const initialState: MusicControlState = {
  isPlaying: false,
  isLoading: false,
  isError: false,
  error: null,
  currentTime: 0, //当前播放时间
  duration: 0, //时长,
  volume: 0.5,
  progress: 0,
  musicInfo: {
    url: '',
    name: '海阔天空',
    singer: '',
    album: '',
    cover: '',
    id: '347230'
  },
  canplay: false,
  //正在调整
  isAdjusting: false,
  bufferProgress: 0,
  //静音
  isMute: false
}

export const musicControlSlice = createSlice({
  name: 'musicControl',
  initialState,
  reducers: {
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload
    },
    setCanPlay: (state, action: PayloadAction<boolean>) => {
      state.canplay = action.payload
    },
    setAujsting: (state, action: PayloadAction<boolean>) => {
      state.isAdjusting = action.payload
    },
    setBufferProgress: (state, action: PayloadAction<number>) => {
      state.bufferProgress = action.payload
    },
    //TODO: 通过音乐ID获取音乐信息并设置，同时给播放器设置url
    setMusicInfo: (state, action: PayloadAction<any>) => {
      state.musicInfo = action.payload
      musicInstance.setUrl(action.payload.url)
    },
    setIsMute: (state, action: PayloadAction<boolean>) => {
      state.isMute = action.payload
    }
  }
})
