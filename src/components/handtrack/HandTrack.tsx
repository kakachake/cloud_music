import { FC, useEffect, useRef, useState } from 'react'
import * as handTrack from 'handtrackjs'
import audioInstance from '../../controller/musicPlayer'
interface HandTrackProps {}
const modelParams = {
  flipHorizontal: true, // flip e.g for video
  maxNumBoxes: 20, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.6 // confidence threshold for predictions.
}
const HandTrack: FC<HandTrackProps> = () => {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null)
  const [isDetect, setIsDetect] = useState(false)
  const isDetectRef = useRef(false)
  const model = useRef<any>(null)
  function runDetection() {
    model.current.detect(video).then((predictions: any) => {
      predictions.forEach((prediction: any) => {
        if (prediction.class === 1) {
          audioInstance.play()
        } else if (prediction.class === 2) {
          audioInstance.pause()
        }
      })
      if (isDetectRef.current) {
        requestAnimationFrame(runDetection)
      }
    })
  }

  function startVideo() {
    handTrack.startVideo(video).then(function (status: any) {
      console.log('video started', status)
      if (status) {
        setIsDetect(true)
        isDetectRef.current = true
        setTimeout(() => {
          runDetection()
        }, 0)
      } else {
      }
    })
  }
  useEffect(() => {
    console.log('load')
    handTrack.load(modelParams).then((lmodel: any) => {
      console.log(lmodel)
      model.current = lmodel
    })
    setVideo(document.getElementById('myvideo') as HTMLVideoElement)
  }, [])
  const toogleVideo = () => {
    if (!isDetect) {
      startVideo()
    } else {
      isDetectRef.current = false
      setIsDetect(false)
      handTrack.stopVideo(video)
    }
  }

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '0%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer'
        }}
        onClick={toogleVideo}
      >
        {isDetect ? <div>关闭识别</div> : <div>开启识别</div>}
      </div>

      <video style={{ display: 'none' }} autoPlay id='myvideo'></video>
    </div>
  )
}

export default HandTrack
