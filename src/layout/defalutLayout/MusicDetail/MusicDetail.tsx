import { DownOutlined, ShareAltOutlined } from '@ant-design/icons'
import { FunctionComponent, useEffect, useState } from 'react'
import { publicSlice } from '../../../redux/publicSlice/slice'
import store, { RootState } from '../../../redux/store'
import style from './MusicDetail.module.css'

import { useSelector } from '../../../redux/hooks'
import Lyric from '../../../components/lyric/Lyric'
import { parseLrc } from '../../../utils'
import Changpian from '../../../components/changpian/Changpian'
import Comment from '../../../components/comment/Comment'
import { getSongComment } from '../../../service/api/music'
import styled from 'styled-components'
import Pagination from '../../../components/pagination/Pagination'
import CommentTabPage from '../../../pages/component/commentTabPage/CommentTabPage'
interface MusicDetailProps {}

const MusicDetail: FunctionComponent<MusicDetailProps> = () => {
  const handleClose = () => {
    store.dispatch(publicSlice.actions.setSongDetailOpen(false))
  }

  const currentTime = useSelector((state: RootState) => state.musicControl.currentTime)
  const isPlaying = useSelector((state: RootState) => state.musicControl.isPlaying)
  const { song, lyric } = useSelector((state) => state.musicControl.musicInfo)

  const [parsedLrc, setParseLrc] = useState<any[]>([])
  const [songHeaderInfoShow, setsongHeaderInfoShow] = useState(false)

  // useEffect(() => {}, [lyric])
  const musicDetailEl = document.getElementById('musicDetail')
  useEffect(() => {
    lyric != '' && setParseLrc(parseLrc(lyric))
    musicDetailEl?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [song])

  //监听元素是否移出可视区域
  useEffect(() => {
    const ob = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setsongHeaderInfoShow(false)
        } else {
          setsongHeaderInfoShow(true)
        }
      })
    })
    const songBaseInfoEL = document.getElementById('songBaseInfo')
    ob.observe(songBaseInfoEL!)
    return () => {
      ob.unobserve(songBaseInfoEL!)
    }
  }, [])
  const changePage = (i: number) => {
    musicDetailEl?.scrollTo({ top: 450, behavior: 'smooth' })
  }
  return (
    <div className={style.musicDetail}>
      <div className={style.musicDetailHeader}>
        <MusicDetailHeader className={style.headerBg} bgImg={song?.al?.picUrl} />
        <div className={style.musicDetailCutIcons}>
          <div onClick={handleClose} className={style.upBtn}>
            <DownOutlined />
          </div>
          <div
            className={`${style.headerSongInfo} ${
              songHeaderInfoShow ? style.headerSongInfoShow : ''
            }`}
          >
            <div className={`${style.songName} line1`}>{song?.name}</div>
            <div className={`${style.ar} line1`}>
              {song?.ar?.map((item: any) => item.name).join('/')} - {song?.al?.name}
            </div>
          </div>
        </div>
      </div>

      <div id='musicDetail' className={style.content}>
        <div className={style.songInfoArea}>
          <div className={style.songBaseInfo} id='songBaseInfo'>
            <div className={`${style.songName} line1`}>{song?.name}</div>
            <div className={`${style.ar} line1`}>
              {song?.ar?.map((item: any) => item.name).join('/')} - {song?.al?.name}
            </div>
          </div>
          <div className={`${style.songPicWrap} `}>
            <Changpian isPlaying={isPlaying} songPicUrl={song?.al?.picUrl} />
          </div>
          <div className={style.lrc}>
            <Lyric lrc={parsedLrc} currentTime={currentTime} _uid='detailPage' />
          </div>
        </div>
        <div className={style.comment}>
          <CommentTabPage onPageChange={changePage} id={song?.id} type='Song' />
        </div>
      </div>
    </div>
  )
}

export default MusicDetail

const MusicDetailHeader = styled.div<{ bgImg: string }>`
  background-image: ${(props) => `url(${props.bgImg})`};
  background-position: center center;
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(80px);
`
