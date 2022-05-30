// 视频相关api
import axRequest from '../index'

enum VIDEO_API {
  //获取mv视频详情
  GET_MV_VIDEO_DETAIL = '/mv/detail',
  //获取mv视频地址
  GET_MV_VIDEO_URL = '/mv/url'
}

//获取mv视频详情
export function getMVVideoDetail(mvid: string) {
  return axRequest.get({
    url: VIDEO_API.GET_MV_VIDEO_DETAIL,
    params: {
      mvid
    }
  })
}

//获取mv视频地址
export function getMVVideoUrl(id: string, r: number) {
  return axRequest.get({
    url: VIDEO_API.GET_MV_VIDEO_URL,
    params: {
      id,
      r
    }
  })
}
