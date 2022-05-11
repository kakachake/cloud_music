import { DownOutlined, ShareAltOutlined } from '@ant-design/icons'
import { FunctionComponent, useEffect, useState } from 'react'
import { publicSlice } from '../../../redux/publicSlice/slice'
import store, { RootState } from '../../../redux/store'
import style from './MusicDetail.module.css'
import changzhen from '../../../assets/img/changzhen.png'
import styled from 'styled-components'
import { useSelector } from '../../../redux/hooks'
import Lyric from '../../../components/lyric/Lyric'
import { parseLrc } from '../../../utils'
import Changpian from '../../../components/changpian/Changpian'
interface MusicDetailProps {}

const MusicDetail: FunctionComponent<MusicDetailProps> = () => {
  const handleClose = () => {
    store.dispatch(publicSlice.actions.setSongDetailOpen(false))
  }

  const currentTime = useSelector((state: RootState) => state.musicControl.currentTime)
  const isPlaying = useSelector((state: RootState) => state.musicControl.isPlaying)
  const { song, lyric, comment } = useSelector((state) => state.musicControl.musicInfo)
  const [parsedLrc, setParseLrc] = useState<any[]>([])
  useEffect(() => {
    lyric != '' && setParseLrc(parseLrc(lyric))
  }, [lyric])

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
            <div className={`${style.songName} line1`}>{song?.name}</div>
            <div className={`${style.ar} line1`}>
              {song?.ar?.map((item: any) => item.name).join('/')} - {song?.al?.name}
            </div>
          </div>
          <div className={`${style.songPicWrap} `}>
            <Changpian isPlaying={isPlaying} songPicUrl={song?.al?.picUrl} />
          </div>
          <div className={style.lrc}>
            <Lyric lrc={parsedLrc} currentTime={currentTime} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicDetail
