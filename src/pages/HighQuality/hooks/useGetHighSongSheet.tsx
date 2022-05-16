import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getHighQualitySongSheets } from '../../../service/api/music'

export const useGetHighSongSheet = () => {
  const [curPage, setCurPage] = useState(1)
  const [highQualityList, setHighQualityList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const { type } = useParams()
  useEffect(() => {
    console.log('useGetHighSongSheet')

    const cat = decodeURIComponent(type || '华语')
    const before = highQualityList[highQualityList.length - 1]?.updateTime ?? ''
    setIsLoading(true)
    getHighQualitySongSheets({ limit: 24, cat, before })
      .then((res) => {
        setHighQualityList([...highQualityList, ...res.playlists])
        setHasMore(res.more)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [curPage])

  return { highQualityList, curPage, setCurPage, isLoading, hasMore }
}
