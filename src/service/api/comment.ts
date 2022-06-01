// 主页相关api
import axRequest from '../index'

enum COMMENT_API {
  //获取热门评论
  GET_HOT_COMMENT = '/comment/hot'
}

export enum comment_type {
  'Song' = 0,
  'MV' = 1,
  'PlayList' = 2,
  'Album' = 3,
  'Video' = 5
}

//获取热门评论
export function getHotComment(id: string, type: comment_type, page = 1, limit = 20) {
  return axRequest.get({
    url: COMMENT_API.GET_HOT_COMMENT,
    params: {
      id,
      limit,
      offset: (page - 1) * limit,
      type
    }
  })
}
