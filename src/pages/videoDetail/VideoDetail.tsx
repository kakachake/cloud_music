import { FC } from 'react'
import VideoPlayer from '../../components/videoPlayer/VideoPlayer'
import style from './VideoDetail.module.css'
interface VideoDetailProps {}

const VideoDetail: FC<VideoDetailProps> = () => {
  return (
    <div className={style.detailWrap}>
      <VideoPlayer
        width={1084}
        height={610}
        src='http://vodkgeyttp8.vod.126.net/cloudmusic/ae2c/core/cdbc/599e1a6ef37930c119293beaf34368ae.mp4?wsSecret=e3d9dde6919f935f9dd2aee9e57c8260&wsTime=1653883046'
      />
    </div>
  )
}

export default VideoDetail
