import { off } from 'process'
import { getSongInfoAndSet, musicControlSlice } from '../redux/musicControl/slice'
import { musicListSlice } from '../redux/musicList/slice'
import { publicSlice } from '../redux/publicSlice/slice'
import store from '../redux/store'
import { getSongDetail } from '../service/api/music'
import { debounce, throttle } from '../utils'
import { useListControl } from './listController'
import audioInstance from './musicPlayer'

export const changeMusic = debounce((direction: number) => {
  const listControl = useListControl()
  const { list, current } = listControl.getList()

  const newIndex = (list.length + current + direction) % list.length
  listControl.curListType != 'fmList' && store.dispatch(getSongInfoAndSet(list[newIndex]))
  //fmlist需要特殊处理
  listControl.curListType === 'fmList' && getSongBaseInfoAndSet(list[newIndex].id)
  // store.dispatch(getSongInfoAndSet(list[newIndex]))
  listControl.setCurrent(newIndex)
}, 500)

export const getSongBaseInfoAndSet = (id: number) => {
  console.log(id)

  getSongDetail(id).then((res) => {
    const song = res.songs?.[0]
    console.log(song)
    song && addMusic(song)
  })
}

export const setMusicList = (payload: any[], type: 'musicList' | 'fmList') => {
  const listControl = useListControl()
  listControl.setList(payload, type)

  changeMusic(0)
}

export const addMusic = async (data: any) => {
  const listControl = useListControl()

  const { music, idx } = getMusicById(data.id)
  if (idx == -1) {
    // const res = await getSongDetail(data.id)
    // const song = res.songs?.[0]
    // if (song === undefined) return
    const song = data
    listControl.addSongToPlayList(song)
    store.dispatch(getSongInfoAndSet(song))
  } else {
    store.dispatch(getSongInfoAndSet(data))
    listControl.setCurrent(idx)
  }
}

export const getMusicById = (id: string) => {
  const listControl = useListControl()
  const { list } = listControl.getList()

  const idx = list.findIndex((item: any) => item.id === id)
  return { music: list[idx], idx }
}

export const clearPlayList = () => {
  const listControl = useListControl()
  store.dispatch(publicSlice.actions.setSongDetailOpen(false))
  listControl.clearList()
  store.dispatch(musicControlSlice.actions.clearMusicInfo())

  audioInstance.setUrl('')
}
