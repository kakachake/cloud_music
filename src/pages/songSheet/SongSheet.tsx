import { FunctionComponent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPlaylistDetail } from '../../service/api/music'
import PlayListHeader, { PLAY_LIST_TYPE } from '../component/PlayListHeader/PlayListHeader'
import TabBar from '../component/tabBar/TabBar'
import TabBarItem from '../component/tabBar/TabBarItem'
import style from './SongSheet.module.css'
interface SongSheetProps {}

const SongSheet: FunctionComponent<SongSheetProps> = () => {
  const { id } = useParams()
  const [songSheetInfo, setSongSheetInfo] = useState<any>({})
  const [activeIndex, setActiveIndex] = useState<string>('playList')
  const [tabList, setTabList] = useState([
    {
      title: '歌曲列表',
      id: 'playList'
    },
    {
      title: '评论',
      id: 'comment'
    },
    {
      title: '收藏者',
      id: 'favoriter'
    }
  ])
  useEffect(() => {
    getPlaylistDetail(id!).then((res) => {
      setSongSheetInfo(res.playlist)
    })
  }, [])
  const handleChangeTab = (id: string) => setActiveIndex(id)
  return (
    <div className={style.songSheet}>
      <PlayListHeader listInfo={songSheetInfo} type={PLAY_LIST_TYPE.songSheet} />
      <TabBar activeIndex={activeIndex}>
        {tabList.map((item, index) => {
          return (
            <TabBarItem onClick={() => handleChangeTab(item.id)} key={item.id} id={item.id}>
              {item.title}
            </TabBarItem>
          )
        })}
      </TabBar>
    </div>
  )
}

export default SongSheet
