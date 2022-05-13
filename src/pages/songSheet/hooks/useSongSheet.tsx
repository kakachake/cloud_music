import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getPlaylistDetail } from '../../../service/api/music'
import { formatNumber } from '../../../utils'

export const useSongSheet = (id: string) => {
  const location = useLocation()
  const [songSheetInfo, setSongSheetInfo] = useState<any>({})
  const [tabList, setTabList] = useState<any[]>([])
  useEffect(() => {
    getPlaylistDetail(id!).then((res) => {
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
  }, [location])
  return { songSheetInfo, tabList }
}