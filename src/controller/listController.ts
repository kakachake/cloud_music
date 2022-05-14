import { musicListSlice } from '../redux/musicList/slice'
import store from '../redux/store'
import { fmListSlice } from '../redux/fmList/slice'
import { publicSlice } from '../redux/publicSlice/slice'

const slice = {
  musicList: musicListSlice,
  fmList: fmListSlice
}

export const useListControl = () => {
  let curListType = store.getState().public.curListType
  return {
    setList: (payload: any[], type: 'fmList' | 'musicList') => {
      store.dispatch(publicSlice.actions.setCurListType(type))
      store.dispatch(slice[type].actions.setList(payload))
      curListType = type
    },
    setCurrent: (payload: number) => {
      store.dispatch(slice[curListType].actions.setCurrent(payload))
    },
    clearList: () => {
      store.dispatch(slice[curListType].actions.clearList())
    },
    getList: () => {
      return store.getState()[curListType]
    },
    addSongToPlayList: (payload: any, idx?: number) => {
      store.dispatch(slice[curListType].actions.addSongToPlayList(payload))
    },
    curListType
  }
}
