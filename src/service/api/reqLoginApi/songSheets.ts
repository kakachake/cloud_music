// 歌单相关api
import axRequest from '../../index'

enum SONG_SHEETS_API {
  //获取每日推荐歌单
  GET_DAILY_RECOMMEND = '/recommend/resource',
  //获取私人FM
  GET_PERSONAL_FM = '/personal_fm'
}

//获取每日推荐歌单
export function getDailyRecommend() {
  return axRequest.get({
    url: SONG_SHEETS_API.GET_DAILY_RECOMMEND
  })
}

//获取私人FM
export function getPersonalFm() {
  return axRequest.get({
    url: SONG_SHEETS_API.GET_PERSONAL_FM
  })
}
