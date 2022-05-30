import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useVideo } from '../../components/videoPlayer/useVideo'
import VideoPlayer from '../../components/videoPlayer/VideoPlayer'
import { useVideoDetail } from '../../hooks/useVideoDetail'
import style from './VideoDetail.module.css'
interface VideoDetailProps {}

const VideoDetail: FC<VideoDetailProps> = () => {
  const { type, id } = useParams()
  const [videoDetail, videoUrl] = useVideoDetail(id)
  console.log(videoDetail, videoUrl)

  return (
    <div className={`${style.detailWrap}`}>
      <div className={style.mainContent}>
        <VideoPlayer
          urls={videoUrl}
          defaultId={1080}
          width={721}
          height={452}
          src='http://vodkgeyttp8.vod.126.net/cloudmusic/067f/core/544a/4c9d548f05dc019dc4f14f294abc912f.mp4?wsSecret=25a51a90ceaac8b45140f5c2c62ee4a8&wsTime=1653896978'
        />
      </div>
      <div className={style.sideBar}></div>
    </div>
  )
}

export default VideoDetail
