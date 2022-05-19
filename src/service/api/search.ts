// 歌单相关api
import axRequest from '../index'

enum SEARCH_API {
  //获取热搜
  GET_HOT_SEARCH = '/search/hot/detail',
  //搜索
  GET_SEARCH_RESULT = '/search'
}

//获取热搜
export function getHotSearch() {
  return axRequest.get({
    url: SEARCH_API.GET_HOT_SEARCH
  })
}

export enum SEARCH_TYPE {
  SONG = 1,
  ALBUM = 10,
  ARTIST = 100,
  PLAYLIST = 1000,
  USER = 1002,
  MV = 1004,
  VIDEO = 1006,
  RADIO = 1009,
  DJ = 1002
}

//搜索
//type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音
//(搜索声音返回字段格式会不一样)
export function getSearchResult(keywords: string, offset: number, type = 1, limit = 20) {
  return axRequest.get({
    url: SEARCH_API.GET_SEARCH_RESULT,
    params: {
      keywords,
      type,
      limit,
      offset
    }
  })
}
