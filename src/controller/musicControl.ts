import { off } from 'process'
import { getSongInfoAndSet, musicControlSlice } from '../redux/musicControl/slice'
import { musicListSlice } from '../redux/musicList/slice'
import { publicSlice } from '../redux/publicSlice/slice'
import store from '../redux/store'
import audioInstance from './musicPlayer'
export const changeMusic = (direction: number) => {
  const { list, current } = store.getState().musicList
  const newIndex = (list.length + current + direction) % list.length
  store.dispatch(getSongInfoAndSet(list[newIndex]))
}

export const addMusic = (data: any) => {
  const { music, idx } = getMusicById(data.id)
  if (idx == -1) {
    store.dispatch(musicListSlice.actions.addSongToPlayList(data))
    store.dispatch(getSongInfoAndSet(data))
  } else {
    store.dispatch(getSongInfoAndSet(music))
  }
}

export const getMusicById = (id: string) => {
  const { list } = store.getState().musicList
  const idx = list.findIndex((item: any) => item.id === id)
  return { music: list[idx], idx }
}

export const clearPlayList = () => {
  store.dispatch(musicListSlice.actions.clearList())
  store.dispatch(musicControlSlice.actions.clearMusicInfo())
  store.dispatch(publicSlice.actions.setSongDetailOpen(false))
  audioInstance.setUrl('')
}
