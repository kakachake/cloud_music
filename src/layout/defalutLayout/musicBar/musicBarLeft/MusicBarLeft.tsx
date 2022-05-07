import { HeartOutlined } from '@ant-design/icons'
import { FunctionComponent, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import style from './MusicBarLeft.module.css'
interface MusicBarLeftProps {}

const MusicBarLeft: FunctionComponent<MusicBarLeftProps> = () => {
  const [isOpenDetail, setIsOpenDetail] = useState(false)
  const toggleChange = () => {
    console.log('toggleChange')
    setIsOpenDetail(!isOpenDetail)
  }
  const songInfo = useSelector((state: RootState) => state.musicControl.musicInfo.song)
  console.log(songInfo)

  return (
    <div>
      {songInfo.name && (
        <div
          style={{
            transform: `${isOpenDetail ? 'translateY(-100%)' : 'translateY(0)'}`
          }}
          className={style.musicBarLeft}
        >
          {/* 默认显示歌曲信息 */}
          <div onClick={toggleChange} className={style.musicInfo}>
            <div className={style.musicPic}>
              <img src={songInfo?.al?.picUrl} alt='' />
            </div>
            <div className={style.songInfo}>
              <div className={`line1 ${style.songInfoNameWrap}`}>
                <div className={`line1 ${style.songInfoName}`}>{songInfo.name + ' '}</div>
                <div className={style.songInfoHandle}>
                  <HeartOutlined />
                </div>
              </div>
              <div>
                <span className={`line1 ${style.songInfoAr}`}>
                  {songInfo?.ar?.map((item: any) => item.name).join('/')}
                </span>
              </div>
            </div>
          </div>
          {/* 点击后显示下面信息 */}
          <div onClick={toggleChange} className={style.musicDetailCut}>
            musicDetailCut
          </div>
        </div>
      )}
    </div>
  )
}

export default MusicBarLeft
