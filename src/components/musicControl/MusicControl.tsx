import { StepBackwardOutlined } from '@ant-design/icons'
import React from 'react'
import style from './MusicControl.module.css'
import { createFromIconfontCN } from '@ant-design/icons'
import { parseSecondToTime } from '../../utils'
import { connect } from 'react-redux'
import store, { RootState } from '../../redux/store'
import { changeMusic } from '../../controller/musicControl'
import {
  getSongInfoAndSet,
  musicControlSlice,
  MusicControlState
} from '../../redux/musicControl/slice'
import audioInstance from '../../controller/musicPlayer'
import { musicListSlice, MusicListState } from '../../redux/musicList/slice'

const IconFont = createFromIconfontCN({
  scriptUrl: 'https://at.alicdn.com/t/font_3370146_f9nlawuexbc.js'
})

interface StateType {
  percent: number
}

interface PropsType extends MusicControlState, MusicListState {
  setCurTime: (curTime: number) => void
  setDuration: (duration: number) => void
  setIsPlay: (isPlay: boolean) => void
  setProgress: (progress: number) => void
  setAdjust: (adjust: boolean) => void
}

class MusicControl extends React.Component<PropsType, StateType> {
  audio: HTMLAudioElement | undefined
  constructor(props: PropsType) {
    super(props)
    this.state = {
      percent: 0
    }
  }

  handleTogglePlay = () => {
    console.log('toggle')

    audioInstance.togglePlay()
  }
  handlePgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    //鼠标距离左边的距离
    const left = e.clientX - e.currentTarget.getBoundingClientRect().left
    const percent = left / e.currentTarget.offsetWidth
    audioInstance.setCurrentTime(percent * this.props.duration)
    this.props.setProgress(percent * 100)
  }
  handleMouseDownDot = (e: React.MouseEvent<HTMLDivElement>) => {
    const barEl = document.getElementById('progressBar')
    this.setBarPercent(e, barEl!)
  }
  setBarPercent = (
    e: React.MouseEvent<HTMLDivElement>,
    barEl: HTMLElement,
    direction: 'row' | 'column' = 'row'
  ) => {
    this.props.setAdjust(true)
    const length = direction === 'row' ? barEl!.offsetWidth : barEl!.offsetHeight
    const dotWidth = e.currentTarget.offsetWidth
    const offset =
      direction === 'row'
        ? e.clientX - e.currentTarget?.offsetLeft
        : e.clientY - e.currentTarget?.offsetTop
    const _mouseMoveHandler = (e: any) => {
      //鼠标距离左边的距离
      const curLength =
        direction === 'row' ? e.clientX - offset + dotWidth : e.clientY - offset + dotWidth

      let percent = direction === 'row' ? curLength / length : (length - curLength) / length

      percent = percent > 1 ? 1 : percent < 0 ? 0 : percent

      this.props.setProgress(percent * 100)
      this.props.setCurTime(percent * this.props.duration)
    }
    window.addEventListener('mousemove', _mouseMoveHandler)
    window.addEventListener('mouseup', () => {
      this.props.setAdjust(false)
      window.removeEventListener('mousemove', _mouseMoveHandler)
    })
  }

  render() {
    return (
      <div className={style.musicControl}>
        <div className={style.top}>
          <IconFont
            onClick={() => changeMusic(-1)}
            className={style.icon}
            type='icon-play-previous'
          />
          <IconFont
            className={`${style.playIcon} ${style.icon}`}
            onClick={this.handleTogglePlay}
            type={this.props.isPlaying ? 'icon-pause' : 'icon-play'}
          />
          <IconFont onClick={() => changeMusic(1)} className={style.icon} type='icon-play-next' />
        </div>
        <div className={style.bottom}>
          <div className={style.curTime}>{parseSecondToTime(this.props.currentTime)}</div>
          <div id='progressBar' onClick={this.handlePgClick} className={style.progress}>
            <div className={style.progressBar}>
              <div style={{ width: `${this.props.progress}%` }} className={style.curBar}>
                <div onMouseDown={this.handleMouseDownDot} className={style.dot}></div>
              </div>
              <div
                style={{ width: `${this.props.bufferProgress}%` }}
                className={style.bufferBar}
              ></div>
            </div>
          </div>
          <div className={style.totalTime}>{parseSecondToTime(this.props.duration)}</div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state: RootState) => ({
    ...state.musicControl,
    ...state.musicList
  }),
  (dispatch: any) => ({
    setCurTime: (curTime: number) => dispatch(musicControlSlice.actions.setCurrentTime(curTime)),
    setDuration: (duration: number) => dispatch(musicControlSlice.actions.setDuration(duration)),
    setIsPlay: (isPlay: boolean) => dispatch(musicControlSlice.actions.setIsPlaying(isPlay)),
    setProgress: (progress: number) => dispatch(musicControlSlice.actions.setProgress(progress)),
    setAdjust: (adjust: boolean) => dispatch(musicControlSlice.actions.setAujsting(adjust))
  })
)(MusicControl)
