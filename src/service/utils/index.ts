import store from '../../redux/store'
import { getLList } from '../../redux/user/slice'
import { likeMusic } from '../api/reqLoginApi/loginMusicHandle'

export const handleToggleLike = (id: string | number, isLiked: boolean) => {
  likeMusic({ id, like: !isLiked }).then((res) => {
    console.log(res)
    const userId = store.getState().user.userInfo?.userId
    userId && store.dispatch(getLList(userId))
  })
}
