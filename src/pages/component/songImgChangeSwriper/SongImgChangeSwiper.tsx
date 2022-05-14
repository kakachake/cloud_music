import { FC, useEffect, useState } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { PersonalFmItem } from '../../personalFm/PersonalFm'
import style from './SongImgChangeSwiper.module.css'
interface SongImgChangeSwriperProps {
  songList: PersonalFmItem[]
  curIndex: number
  setCurIndex: (index: number) => void
}

const SongImgChangeSwriper: FC<SongImgChangeSwriperProps> = (props) => {
  const { songList } = props
  const [picList, setPicList] = useState<string[]>([])
  const { curIndex, setCurIndex } = props
  useEffect(() => {
    setPicList([...songList.map((item) => item?.album?.picUrl)])
  }, [songList])
  const handelPrevClick = () => {
    if (curIndex === 0) {
      return
    }
    setCurIndex(-1)
  }
  return (
    <div className={style.imgWrap}>
      {/* <TransitionGroup>
        {picList.map((el) => (
          <CSSTransition key={el} classNames='slide' timeout={500}> */}
      {picList.map((el, idx) => {
        if (idx === curIndex || idx === curIndex + 1 || idx === curIndex - 1) {
          return (
            <div
              onClick={idx === curIndex - 1 ? handelPrevClick : undefined}
              key={el}
              className={`
          ${idx === curIndex ? style.curImg : ''}
          ${idx === curIndex - 1 ? style.prevImg : ''}
          ${idx === curIndex + 1 ? style.nextImg : ''}
        `}
            >
              <img src={el} alt='' />
            </div>
          )
        } else {
          return ''
        }
      })}

      {/* </CSSTransition>
        ))}
      </TransitionGroup> */}
    </div>
  )
}

export default SongImgChangeSwriper
