import { FunctionComponent } from 'react'
import style from './musicBar.module.css'
import MusicControl from '../../../components/musicControl/MusicControl'

import { connect } from 'react-redux'
import VolumeControl from '../../../components/volumeControl/VolumeControl'
import { IconFont } from '../../../assets/css/iconFont'
import audioInstance from '../../../controller/musicPlayer'
import { useSelector } from '../../../redux/hooks'
import { RootState } from '../../../redux/store'

const MusicBar: FunctionComponent = () => {
  const isMute = useSelector((state: RootState) => state.musicControl.isMute)

  const toggleVolume = () => {
    audioInstance.toggleVolume()
  }

  return (
    <div className={style.musicBar}>
      <div className={style.musicInfo}>musicInfo</div>
      <div className={style.play}>
        <MusicControl />
      </div>
      <div className={style.other}>
        <div className={style.volume}>
          <IconFont
            onClick={toggleVolume}
            className={style.icon}
            type={`${isMute ? 'icon-sound-off' : 'icon-sound-on'}`}
          />
          <div className={style.volumeControl}>
            <VolumeControl />
          </div>
        </div>
        <IconFont className={style.icon} type={`icon-playlist`} />
      </div>
    </div>
  )
}

export default MusicBar
