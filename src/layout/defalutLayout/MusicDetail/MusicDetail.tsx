import { DownOutlined, ShareAltOutlined } from '@ant-design/icons'
import { FunctionComponent } from 'react'
import { publicSlice } from '../../../redux/publicSlice/slice'
import store, { RootState } from '../../../redux/store'
import style from './MusicDetail.module.css'
import changzhen from '../../../assets/img/changzhen.png'
import styled from 'styled-components'
import { useSelector } from '../../../redux/hooks'
import Lyric from '../../../components/lyric/Lyric'
import { parseLrc } from '../../../utils'
interface MusicDetailProps {}

const MusicDetail: FunctionComponent<MusicDetailProps> = () => {
  const handleClose = () => {
    store.dispatch(publicSlice.actions.setSongDetailOpen(false))
  }
  const isPlaying = useSelector((state: RootState) => state.musicControl.isPlaying)
  const { song, lyric, comment } = useSelector((state) => state.musicControl.musicInfo)
  return (
    <div className={style.musicDetail}>
      <div className={style.musicDetailHeader}>
        <div className={style.musicDetailCutIcons}>
          <div onClick={handleClose} className={style.upBtn}>
            <DownOutlined />
          </div>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.songInfoArea}>
          <div className={style.songBaseInfo}>
            <div className={`${style.songName} line1`}>{song.name}</div>
            <div className={`${style.ar} line1`}>
              {song.ar.map((item: any) => item.name).join('/')} - {song.al.name}
            </div>
          </div>
          <div className={`${style.songPicWrap} ${isPlaying ? style.changPianPlay : ''}`}>
            <div className={style.changZhen}>
              <img src={changzhen} alt='' />
            </div>
            <div className={`${style.changPian} `}>
              <div className={style.changPianWen}>
                <ChangPianWen idx={1} />
                <ChangPianWen idx={2} />
                <ChangPianWen idx={3} />
                <ChangPianWen idx={4} />
              </div>
              <div className={style.changPianInner}>
                <div className={style.changPianPic}>
                  <img src={song?.al?.picUrl} alt='' />
                </div>
              </div>
            </div>
          </div>
          <div className={style.lrc}>
            <Lyric lrc={parseLrc(lyric)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicDetail

const ChangPianWen = styled.div<{ idx: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${(props) => `${240 - 10 * props.idx}px`};
  height: ${(props) => `${240 - 10 * props.idx}px`};

  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid #292a2c;
`
