import { FunctionComponent } from 'react'
import style from './musicBar.module.css'
import MusicControl from '../../../components/musicControl/MusicControl'
import { createFromIconfontCN } from '@ant-design/icons'
import { connect } from 'react-redux'
import VolumeControl from '../../../components/volumeControl/VolumeControl'
const IconFont = createFromIconfontCN({
  scriptUrl: 'https://at.alicdn.com/t/font_3370146_f9nlawuexbc.js'
})
import audioInstance from '../../../controller/musicPlayer'
import { RootState } from '../../../redux/store'
import { MusicControlState } from '../../../redux/musicControl/slice'
const MusicBar: FunctionComponent = () => {
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
          <IconFont onClick={toggleVolume} className={style.icon} type={'icon-sound-on'} />
          <div className={style.volumeControl}>
            <VolumeControl />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MusicBar
