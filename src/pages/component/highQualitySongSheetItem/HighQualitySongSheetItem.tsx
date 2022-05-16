import { FC } from 'react'
import { HighQualitySongSheetType } from '../../../type/highQualitySongSheet'
import style from './HighQualitySongSheetItem.module.css'
import playListImg from '../../../assets/img/playListImg.png'
import { PlayCircleOutlined } from '@ant-design/icons'
import { formatNumber } from '../../../utils'
interface HighQualitySongSheetItemProps {
  songSheetInfo: HighQualitySongSheetType
}

const HighQualitySongSheetItem: FC<HighQualitySongSheetItemProps> = (props) => {
  const { songSheetInfo } = props
  return (
    <div className={style.sheetWrap}>
      <div className={style.imgWrap}>
        <img src={(songSheetInfo.coverImgUrl || songSheetInfo.coverImgUrl) ?? playListImg} alt='' />
        <div className={style.content}>
          <div className={style.playCount}>
            <PlayCircleOutlined className={style.playIcon} />
            {formatNumber(songSheetInfo.playCount || songSheetInfo.playCount || 0)}
          </div>
          <div className={style.hoverWrap}>
            <PlayCircleOutlined className={style.playIcon} />
          </div>
        </div>
      </div>
      <div className={style.sheetContent}>
        <div className={`${style.sheetName} line1`}>{songSheetInfo.name}</div>
        <div className={style.creator}>by {songSheetInfo.creator.nickname}</div>
        <div className={style.copywriter}>{songSheetInfo.copywriter}</div>
      </div>
    </div>
  )
}

export default HighQualitySongSheetItem
