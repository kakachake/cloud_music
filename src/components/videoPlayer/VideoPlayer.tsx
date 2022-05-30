import { ArrowsAltOutlined, LoadingOutlined, ShrinkOutlined } from '@ant-design/icons'
import { FC, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import { IconFont } from '../../assets/css/iconFont'
import { useClick } from '../../hooks/useClick'
import { useFullScreen } from '../../hooks/useFullScreen'
import { parseSecondToTime } from '../../utils'
import { enterFullScreen, exitFullScreen, isFullScreen } from '../../utils/fullScreen'
import ProgressBar from '../progressBar/ProgressBar'
import { useVideo } from './useVideo'
import style from './VideoPlayer.module.css'
interface VideoPlayerProps {
  width?: number
  height?: number
  src?: string
  poster?: string
  controls?: boolean
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  playsinline?: boolean
  preload?: 'auto' | 'metadata' | 'none'
  onCanPlay?: () => void
  onCanPlayThrough?: () => void
  onEnded?: () => void
  onError?: () => void
  onPause?: () => void
  onPlay?: () => void
  onPlaying?: () => void
  onSeeked?: () => void
  onSeeking?: () => void
  onStalled?: () => void
  onWaiting?: () => void
}

const VideoPlayer: FC<VideoPlayerProps> = (props) => {
  const {
    width = '100%',
    height = '100%',
    src,
    poster,
    controls = true,
    autoplay = false,
    loop = false,
    muted = false,
    playsinline = true,
    preload = 'auto',
    onCanPlay,
    onCanPlayThrough,
    onEnded,
    onError,
    onPause,
    onPlay,
    onPlaying,
    onSeeked,
    onSeeking,
    onStalled,
    onWaiting
  } = props

  const [
    videoEl,
    {
      percent,
      currentTime,
      duration,
      isPlaying,
      isAdjust,
      bufferProgress,
      onChangePercent,
      handleTogglePlay,
      loading,
      handleSetVolume,
      handleToggleMute,
      ismuted,
      volume
    }
  ] = useVideo()
  const videoPlayEl = useRef<HTMLElement | null>(null)
  useEffect(() => {
    videoPlayEl.current = document.getElementById('videoPlayer')
  }, [])
  const [isFull] = useFullScreen()
  const handleFullScreen = () => {
    if (isFullScreen()) {
      exitFullScreen()
    } else {
      enterFullScreen(videoPlayEl.current)
    }
  }

  const [handleClick, fullScreen] = useClick(
    { clickFn: handleTogglePlay, doubleFn: handleFullScreen },
    300
  )

  return (
    <VideoPlayerWrapper
      id='videoPlayer'
      className={style.videoWrapper}
      width={width}
      height={height}
    >
      <div className={style.video}>
        <video onClick={handleClick} onDoubleClick={fullScreen} id='videoPlay' src={src}></video>
      </div>
      <div className={style.layerIcon}>
        <CSSTransition in={loading} unmountOnExit timeout={500} classNames='fade'>
          <LoadingOutlined />
        </CSSTransition>
      </div>
      <div className={style.videoControl}>
        <div className={style.controlTop}>
          <ProgressBar
            onChangeStart={() => {
              isAdjust.current = true
            }}
            onChangeEnd={() => {
              isAdjust.current = false
            }}
            percent={percent}
            underPercent={bufferProgress}
            setPercent={(number) => onChangePercent(number)}
          />
        </div>
        <div className={style.controlBottom}>
          <div className={style.left}>
            <div>
              <IconFont
                className={`${style.playIcon} ${style.icon}`}
                onClick={handleTogglePlay}
                type={isPlaying ? 'icon-pause' : 'icon-play'}
              />
            </div>
            <div className={style.time}>
              <span>{parseSecondToTime(currentTime)}</span> /{' '}
              <span>{parseSecondToTime(duration)}</span>
            </div>
          </div>
          <div className={style.right}>
            <div className={style.volume}>
              <IconFont
                onClick={() => handleToggleMute()}
                className={style.icon}
                type={`${ismuted ? 'icon-sound-off' : 'icon-sound-on'}`}
              />
              <div className={style.volumeBar}>
                <ProgressBar percent={volume} setPercent={(number) => handleSetVolume(number)} />
              </div>
            </div>
            <div onClick={fullScreen} className={style.fullscreen}>
              {isFull ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
            </div>
          </div>
        </div>
      </div>
    </VideoPlayerWrapper>
  )
}

export default VideoPlayer

const VideoPlayerWrapper = styled.div<{
  width: number | string
  height: number | string
}>`
  width: ${(props) => (typeof props.width === 'number' ? `${props.width}px` : props.width)};
  height: ${(props) => (typeof props.height === 'number' ? `${props.height}px` : props.height)};
`
