import { useEffect, useRef, useState } from 'react'

export const useVideo = () => {
  const [percent, setPercent] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [ismuted, setIsmuted] = useState(false)
  const [volume, setVolume] = useState(50)
  const isAdjust = useRef(false)
  const [bufferProgress, setBufferProgress] = useState(0)
  const videoEl = useRef<HTMLVideoElement | null>(null)

  const onChangePercent = (per: number) => {
    setPercent(per)
    setCurrentTime((per / 100) * duration)

    if (!isAdjust.current && videoEl.current) {
      videoEl.current.currentTime = (per / 100) * duration
    }
  }

  const handleTogglePlay = () => {
    if (isPlaying) {
      videoEl.current?.pause()
    } else {
      videoEl.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleToggleMute = (mute?: boolean) => {
    if (videoEl.current) {
      if (mute != undefined) {
        videoEl.current.muted = mute
        setIsmuted(mute)
        return
      }
      videoEl.current.muted = !videoEl.current.muted

      setIsmuted(videoEl.current.muted)
    }
  }

  const listenTimeupdate = () => {
    if (videoEl.current && !isAdjust.current) {
      const { current } = videoEl
      const { duration, currentTime, buffered } = current
      const timeRanges = buffered
      if (timeRanges.length > 0) {
        setBufferProgress((timeRanges.end(timeRanges.length - 1) / duration) * 100)
      }

      const percent = currentTime / duration
      setPercent(percent * 100)
      setCurrentTime(currentTime)
      setDuration(duration)
    }
  }

  const onWating = () => {
    setLoading(true)
  }

  const onPlaying = () => {
    setLoading(false)
  }

  const handleSetVolume = (volume: number) => {
    console.log(volume)

    if (videoEl.current) {
      if (volume > 0) {
        videoEl.current.volume = volume / 100
        setVolume(volume)
        handleToggleMute(false)
      } else {
        handleToggleMute(true)
      }
    }
  }

  const onHandleCanPlay = () => {
    if (videoEl.current) {
      const { current } = videoEl
      const { duration, currentTime } = current
      console.log('currentTime', currentTime)
      const percent = currentTime / duration
      setPercent(percent * 100)
      setCurrentTime(currentTime)
      setDuration(duration)
    }
  }
  const listenVolumeupdate = (e: any) => {
    console.log(e)
  }

  useEffect(() => {
    videoEl.current = document.querySelector('video')
    if (videoEl.current) {
      videoEl.current.addEventListener('canplay', onHandleCanPlay)
      videoEl.current.addEventListener('volumechange', listenVolumeupdate)
      // videoEl.current.addEventListener('canplaythrough', props.onCanPlayThrough)
      // videoEl.current.addEventListener('ended', props.onEnded)
      // videoEl.current.addEventListener('error', props.onError)
      // videoEl.current.addEventListener('pause', props.onPause)
      // videoEl.current.addEventListener('play', props.onPlay)
      // videoEl.current.addEventListener('playing', props.onPlaying)
      videoEl.current.addEventListener('seeked', () => {
        console.log('seeked')
      })
      videoEl.current.addEventListener('waiting', onWating)
      videoEl.current.addEventListener('playing', onPlaying)

      videoEl.current.addEventListener('loadstart', () => {
        console.log('loadstart')
      })

      videoEl.current.addEventListener('timeupdate', listenTimeupdate)
    }
    return () => {
      if (videoEl.current) {
        videoEl.current.addEventListener('timeupdate', listenTimeupdate)
        // videoEl.current.removeEventListener('canplay', props.onCanPlay)
        // videoEl.current.removeEventListener('canplaythrough', props.onCanPlayThrough)
      }
    }
  }, [])
  return [
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
  ] as [
    React.MutableRefObject<HTMLVideoElement | null>,
    {
      percent: number
      currentTime: number
      duration: number
      isPlaying: boolean
      isAdjust: React.MutableRefObject<boolean>
      bufferProgress: number
      onChangePercent: (per: number) => void
      handleTogglePlay: () => void
      loading: boolean
      handleSetVolume: (volume: number) => void
      handleToggleMute: (mute?: boolean) => void
      ismuted: boolean
      volume: number
    }
  ]
}
