import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getHighQualitySongSheets } from '../../../service/api/music'

export const useGetHighSongSheet = () => {
  const [curPage, setCurPage] = useState(1)
  const [highQualityList, setHighQualityList] = useState<any>()

  const { type } = useParams()
  useEffect(() => {
    const cat = decodeURIComponent(type || '华语')
    getHighQualitySongSheets({ limit: 24, cat }).then((res) => {
      setHighQualityList(res.playlists)
    })
  }, [curPage])

  return { highQualityList, curPage, setCurPage }
}
