import axRequest from '../index'

enum MUSIC_API {
  //获取推荐歌单，不需登录
  //可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
  GET_PERSONALIZED_SONG_SHEETS = '/personalized',
  //获取歌单详情
  GET_PLAYLIST_DETAIL = '/playlist/detail',
  //获取歌曲详情
  GET_SONG_DETAIL = '/song/detail',
  //获取歌曲歌词
  GET_SONG_LYRIC = '/lyric',
  //获取歌曲Url
  GET_SONG_URL = '/song/url',
  //获取歌曲评论
  GET_SONG_COMMENT = '/comment/music'
}

//获取歌单详情
export function getPlaylistDetail(id: string) {
  return axRequest.get({
    url: MUSIC_API.GET_PLAYLIST_DETAIL,
    params: {
      id
    }
  })
}

//获取歌曲详情
export function getSongDetail(ids: number | string) {
  return axRequest.get({
    url: MUSIC_API.GET_SONG_DETAIL,
    params: {
      ids
    }
  })
}

//获取推荐歌单
export function getPersonalizedSongSheets(limit = 30) {
  return axRequest.get({
    url: MUSIC_API.GET_PERSONALIZED_SONG_SHEETS,
    params: {
      limit
    }
  })
}

//获取歌曲歌词
export function getSongLyric(id: number | string) {
  return axRequest.get({
    url: MUSIC_API.GET_SONG_LYRIC,
    params: {
      id
    }
  })
}

//获取歌曲Url
export function getSongUrl(id: number | string) {
  return axRequest.get({
    url: MUSIC_API.GET_SONG_URL,
    params: {
      id
    }
  })
}

//获取歌曲评论
export function getSongComment(id: number | string) {
  return axRequest.get({
    url: MUSIC_API.GET_SONG_COMMENT,
    params: {
      id
    }
  })
}
