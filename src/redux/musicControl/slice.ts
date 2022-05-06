import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'
import Toast from '../../components/Toast'
import musicInstance from '../../controller/musicPlayer'
import { getSongLyric, getSongUrl } from '../../service/api/music'

export const getSongInfoAndSet = createAsyncThunk(
  'musicControl/getSongInfoAndSet',
  async (song: any) => {
    const res = await Promise.allSettled([getSongLyric(song.id), getSongUrl(song.id)])
    const [lyric, url] = res.map((item: any) => item.value)
    console.log(lyric, url)

    if (lyric.code === 200 && url.code === 200) {
      return {
        song,
        lyric: lyric.lrc.lyric,
        url: url.data[0].url
      }
    } else {
      Toast.error('获取歌曲信息失败')
      return {
        song,
        lyric: '',
        url: ''
      }
    }
  }
)

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
    musicDetail: {},
    musicLyric: {},
    comment: {}
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
  },
  extraReducers: {
    [getSongInfoAndSet.fulfilled.type]: (state, action: PayloadAction<any>) => {
      console.log('getSongInfoAndSet', action.payload)

      state.musicInfo.musicDetail = action.payload.song
      state.musicInfo.musicLyric = action.payload.lrc
      musicInstance.setUrl(action.payload.url)
    }
  }
})
