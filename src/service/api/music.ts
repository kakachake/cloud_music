import axRequest from '../index'

enum MusicAPI {
  //获取歌单详情
  GET_PLAYLIST_DETAIL = '/playlist/detail',
  //获取歌曲详情
  GET_SONG_DETAIL = '/song/detail'
}

//获取歌单列表
export function getPlaylistDetail(id: number) {
  return axRequest.get({
    url: MusicAPI.GET_PLAYLIST_DETAIL,
    params: {
      id
    }
  })
}

//获取歌曲详情
export function getSongDetail(id: number) {
  return axRequest.get({
    url: MusicAPI.GET_SONG_DETAIL,
    params: {
      id
    }
  })
}
