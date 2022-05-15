import Toast from '../../components/Toast'
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
  GET_SONG_COMMENT = '/comment/music',
  //获取歌单评论
  GET_PLAYLIST_COMMENT = '/comment/playlist',
  //下载歌曲
  DOWNLOAD_SONG = '/song/download/url'
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
export function getSongComment(id: number | string, page: number) {
  return axRequest.get({
    url: MUSIC_API.GET_SONG_COMMENT,
    params: {
      id,
      offset: (page - 1) * 20
    }
  })
}

//获取歌单评论
export function getPlaylistComment(id: number | string, page: number) {
  return axRequest.get({
    url: MUSIC_API.GET_PLAYLIST_COMMENT,
    params: {
      id,
      offset: (page - 1) * 20
    }
  })
}

//下载歌曲
export function downLoadMusic(id: string | number, fileName: string) {
  return axRequest
    .get({
      url: MUSIC_API.DOWNLOAD_SONG,
      params: {
        id
      }
    })
    .then((res) => {
      const url = res.data.url
      console.log(url)

      Toast.success('正在下载')
      return axRequest.get({ url, responseType: 'blob' })
    })
    .then((res) => {
      const blob = res
      const binaryData = []
      binaryData.push(blob)
      const href = window.URL.createObjectURL(new Blob(binaryData))
      console.log(href)
      const a = document.createElement('a')
      a.href = href
      a.download = fileName + '.mp3'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      Toast.success('下载成功')
    })
    .catch((err) => {
      console.log(err)
      Toast.error('下载失败,请稍后重试!')
    })
}
