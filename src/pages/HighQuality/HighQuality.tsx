import { FC, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { HighQualitySongSheetType } from '../../type/highQualitySongSheet'
import { isScrollBottom } from '../../utils'
import HighQualitySongSheetItem from '../component/highQualitySongSheetItem/HighQualitySongSheetItem'
import style from './HighQuality.module.css'
import { useGetHighSongSheet } from './hooks/useGetHighSongSheet'

interface HighQualityProps {}

const HighQuality: FC<HighQualityProps> = () => {
  const { type } = useParams()
  const { highQualityList, curPage, setCurPage, isLoading, hasMore } = useGetHighSongSheet()
  const scrollAddPage = () => {
    const mainContent = document.querySelector('#mainContent')
    const isBottom = isScrollBottom(mainContent!)
    if (isBottom) {
      console.log('set')
      addPage()
    }
  }
  useEffect(() => {
    const mainContent = document.querySelector('#mainContent')
    mainContent?.addEventListener('scroll', scrollAddPage)

    return () => {
      mainContent?.removeEventListener('scroll', scrollAddPage)
    }
  }, [curPage, isLoading])
  const addPage = () => {
    console.log('addPage')
    if (!isLoading && hasMore) {
      setCurPage(curPage + 1)
    }
  }
  return (
    <div>
      <div className={style.listWrap}>
        {highQualityList &&
          highQualityList.map((item: HighQualitySongSheetType) => (
            <HighQualitySongSheetItem key={item.id} songSheetInfo={item} />
          ))}
      </div>
      {hasMore && <div className={style.loading}>加载中...</div>}
    </div>
  )
}

export default HighQuality
