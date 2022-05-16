import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { HighQualitySongSheetType } from '../../type/highQualitySongSheet'
import HighQualitySongSheetItem from '../component/highQualitySongSheetItem/HighQualitySongSheetItem'
import style from './HighQuality.module.css'
import { useGetHighSongSheet } from './hooks/useGetHighSongSheet'

interface HighQualityProps {}

const HighQuality: FC<HighQualityProps> = () => {
  const { type } = useParams()
  const { highQualityList, curPage, setCurPage } = useGetHighSongSheet()
  return (
    <div>
      <div className={style.listWrap}>
        {highQualityList &&
          highQualityList.map((item: HighQualitySongSheetType) => (
            <HighQualitySongSheetItem key={item.id} songSheetInfo={item} />
          ))}
      </div>
    </div>
  )
}

export default HighQuality
