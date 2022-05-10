import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { FunctionComponent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { IconFont } from '../../assets/css/iconFont'
import audioInstance from '../../controller/musicPlayer'
import { musicControlSlice } from '../../redux/musicControl/slice'
import store, { RootState } from '../../redux/store'
import { parseLrc, parseSecondToTime } from '../../utils'
import Toast from '../Toast'
import style from './Lyric.module.css'
interface LyricProps {
  lrc: {
    lrc: string
    time: number
  }[]
  currentTime: number
}

const Lyric: FunctionComponent<LyricProps> = ({ lrc: parsedLrc, currentTime }) => {
  const [curLrcIdx, setCurLrcIdx] = useState(0)
  const lrcWrapEl = document.getElementById('lrcWrap')
  const [stopScroll, setStopScroll] = useState(false)
  const [scrollIdx, setScrollIdx] = useState(0)
  const [timeOffset, setTimeOffset] = useState(0)
  useEffect(() => {
    for (let i = 0; i < parsedLrc.length; i++) {
      if (currentTime + timeOffset < parsedLrc[i].time) {
        setCurLrcIdx(i - 1 >= 0 ? i - 1 : 0)
        //设置scroll
        if (lrcWrapEl && !stopScroll) {
          lrcWrapEl.scrollTo({ top: i * 36 - 18, behavior: 'smooth' })
        }
        break
      }
    }
  }, [currentTime])
  useEffect(() => {
    setTimeOffset(0)
  }, [parsedLrc])
  const wheelEvent = (e: any) => {
    const lrcWrap = document.getElementById('lrcWrap')

    const scrollTop = lrcWrap!.scrollTop
    const idx = +((scrollTop + 18) / 36).toFixed(0)
    setScrollIdx(idx - 1)
  }
  const handleToTime = () => {
    const selectTime = parsedLrc[scrollIdx].time
    audioInstance.setCurrentTime(selectTime)
    audioInstance.play()
  }
  const handleChangeOffset = (e: any) => {
    const newTimeOffset = timeOffset + e
    setTimeOffset(newTimeOffset)
    Toast.success((newTimeOffset >= 0 ? '+' : '') + newTimeOffset + 's')
  }
  return (
    <div
      onMouseEnter={() => setStopScroll(true)}
      onMouseLeave={() => setStopScroll(false)}
      className={style.lrcContainer}
    >
      <div className={style.timeOffsetWrap}>
        <div onClick={() => handleChangeOffset(-0.5)} className={style.lrcTimeUp}>
          <UpOutlined />
        </div>
        <div onClick={() => handleChangeOffset(0.5)} className={style.lrcTimeDown}>
          <DownOutlined />
        </div>
      </div>
      <div className={`${style.centerLine} ${stopScroll ? style.lineShow : ''}`}>
        <div className={style.leftLine}>
          <div className={style.leftTime}>{parseSecondToTime(parsedLrc?.[scrollIdx]?.time)}</div>
        </div>
        <div className={style.rightLine}>
          <div className={style.rightPlay}>
            <IconFont
              className={`${style.playIcon} ${style.icon}`}
              onClick={() => handleToTime()}
              type={'icon-play'}
            />
          </div>
        </div>
      </div>
      <div id='lrcWrap' className={style.lrcWrap} onScroll={wheelEvent}>
        <div className={style.lrcContent}>
          {parsedLrc.map((item, idx) => {
            return (
              <div
                key={idx}
                className={`${idx === curLrcIdx ? style.lrcActive : ''} ${style.lrcItem} line1`}
              >
                {item.lrc}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Lyric
