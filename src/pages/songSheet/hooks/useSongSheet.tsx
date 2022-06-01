import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getPlaylistComment, getPlaylistDetail } from '../../../service/api/music'
import { formatNumber } from '../../../utils'

export const useSongSheet = (id: string) => {
  const location = useLocation()
  const [songSheetInfo, setSongSheetInfo] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [tabList, setTabList] = useState<any[]>([])
  const handleGetPlaylistDetail = () => {
    setLoading(true)
    getPlaylistDetail(id!)
      .then((res) => {
        setSongSheetInfo(res.playlist)
        setTabList([
          {
            title: '歌曲列表',
            id: 'playList'
          },
          {
            title: `评论 (${formatNumber(res.playlist.commentCount)})`,
            id: 'comment'
          },
          {
            title: '收藏者',
            id: 'favoriter'
          }
        ])
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    handleGetPlaylistDetail()
  }, [id])
  return { songSheetInfo, tabList, handleGetPlaylistDetail, loading }
}
