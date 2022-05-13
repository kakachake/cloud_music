import { DashOutlined, DeleteOutlined, HeartOutlined, StepForwardOutlined } from '@ant-design/icons'
import { FC, useEffect, useState } from 'react'
import { getSongDetail } from '../../service/api/music'
import { getPersonalFm } from '../../service/api/reqLoginApi/songSheets'
import { AlbumType } from '../../type/album'
import SongImgChangeSwiper from '../component/songImgChangeSwriper/SongImgChangeSwiper'
import style from './PersonalFm.module.css'
import { addMusic } from '../../controller/musicControl'
import { useSelector } from '../../redux/hooks'
import Lyric from '../../components/lyric/Lyric'
import { parseLrc } from '../../utils'
import { RootState } from '../../redux/store'
export interface PersonalFmItem {
  album: AlbumType
  name: string
  id: number
}

interface PersonalFmProps {}

const PersonalFm: FC<PersonalFmProps> = () => {
  const [personalFmList, setPersonalFmList] = useState<PersonalFmItem[] | []>([])
  const [curIndex, setCurIndex] = useState<number>(0)
  const currentTime = useSelector((state: RootState) => state.musicControl.currentTime)
  const [parsedLrc, setParseLrc] = useState<any[]>([])
  const { song, lyric } = useSelector((state) => state.musicControl.musicInfo)
  useEffect(() => {
    getPersonalFm().then((res) => {
      setPersonalFmList(res.data)
    })
    console.log(personalFmList)
  }, [])
  useEffect(() => {
    if (personalFmList.length) {
      getSongDetail(personalFmList?.[curIndex]?.id).then((res) => {
        const song = res.songs?.[0]
        song && addMusic(song)
      })
    }
  }, [personalFmList, curIndex])
  useEffect(() => {
    lyric != '' && setParseLrc(parseLrc(lyric))
  }, [song])
  const handleChangIdx = () => {
    if (curIndex === personalFmList.length - 1) {
      return
    }
    setCurIndex(curIndex + 1)
    checkNeedFeachFm(curIndex + 1)
  }
  const checkNeedFeachFm = (idx: number) => {
    if (idx === personalFmList.length - 1) {
      getPersonalFm().then((res) => {
        setPersonalFmList([...personalFmList, ...res.data])
      })
    }
  }
  return (
    <div className={`baseContainer ${style.personFmWrap}`}>
      <div className={style.songArea}>
        <div className={style.songAreaLeft}>
          <div className={style.songImgChangeSwriper}>
            <SongImgChangeSwiper
              songList={personalFmList}
              curIndex={curIndex}
              setCurIndex={setCurIndex}
            />
          </div>
          <div className={style.songImgHandle}>
            <div className={style.handleItem}>
              <HeartOutlined />
            </div>
            <div className={style.handleItem}>
              <DeleteOutlined />
            </div>
            <div onClick={handleChangIdx} className={style.handleItem}>
              <StepForwardOutlined />
            </div>
            <div className={style.handleItem}>
              <DashOutlined />
            </div>
          </div>
        </div>
        <div className={style.songAreaRight}>
          <div className={style.songAreaRightHeader}>
            <div className={`${style.songName} line1`}>{song?.name}</div>
            <div className={style.songOther}>
              <div className='line1'>专辑：{song?.al?.name}</div>
              <div className='line1'>
                歌手：
                {song?.ar?.map((item: any) => item.name).join('/')}
              </div>
            </div>
          </div>
          <div className={style.lrc}>
            <Lyric lrc={parsedLrc} currentTime={currentTime} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalFm
