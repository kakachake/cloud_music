import { FunctionComponent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPlaylistDetail } from '../../service/api/music'
import { formatNumber, formatTime, pad, parseSecondToTime } from '../../utils'
import PlayListHeader, { PLAY_LIST_TYPE } from '../component/PlayListHeader/PlayListHeader'
import TabBar from '../component/tabBar/TabBar'
import TabBarItem from '../component/tabBar/TabBarItem'
import style from './SongSheet.module.css'
import MuTable, { TableColumnType } from '../../components/muTable/MuTable'
import { useSongSheet } from './hooks/useSongSheet'
import { CloudDownloadOutlined, HeartOutlined } from '@ant-design/icons'
import store from '../../redux/store'
import { musicListSlice } from '../../redux/musicList/slice'
import { getSongInfoAndSet } from '../../redux/musicControl/slice'
import { addMusic } from '../../controller/musicControl'

interface SongSheetProps {}

const SongSheet: FunctionComponent<SongSheetProps> = () => {
  const { id } = useParams()
  const { songSheetInfo, tabList } = useSongSheet(id!)
  const [activeIndex, setActiveIndex] = useState<string>('playList')
  const handleChangeTab = (id: string) => setActiveIndex(id)

  const columns: TableColumnType[] = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: (data: any, idx: number) => {
        return <div className={style.tableHandle}>{pad(idx)}</div>
      },
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'name',
      key: 'name',
      render: (data: any, idx: number) => {
        return (
          <div className={style.tableHandle}>
            <HeartOutlined />
            <CloudDownloadOutlined />
          </div>
        )
      },
      width: (2 / 24) * 100 + '%',
      align: 'center'
    },
    {
      title: '歌曲',
      dataIndex: 'name',
      key: 'name',
      render: (data: any) => {
        return <span className={`line1`}>{data.name}</span>
      },
      width: (8 / 24) * 100 + '%',
      align: 'left'
    },
    {
      title: '歌手',
      dataIndex: 'ar',
      key: 'ar',
      render: (data: any) => {
        return <span className={`line1`}>{data.ar.map((item: any) => item.name).join('/')}</span>
      },
      width: (5 / 24) * 100 + '%',
      align: 'left'
    },
    {
      title: '专辑',
      dataIndex: 'al',
      key: 'al',
      render: (data: any) => {
        return <span className={`line1`}>{data.al.name}</span>
      },
      width: (6 / 24) * 100 + '%',
      align: 'left'
    },
    {
      title: '时长',
      dataIndex: 'dt',
      key: 'dt',
      render: (data: any) => {
        return <span>{parseSecondToTime(data.dt / 1000)}</span>
      },
      width: (2 / 24) * 100 + '%',
      align: 'center'
    }
  ]
  const onColDoubleClick = (data: any) => {
    addMusic(data)
  }
  const handlePlayList = () => {
    const { tracks } = songSheetInfo
    store.dispatch(musicListSlice.actions.setList(tracks))
    store.dispatch(getSongInfoAndSet(tracks?.[0]))
  }
  return (
    <div className={style.songSheet}>
      <PlayListHeader
        handlePlayList={handlePlayList}
        listInfo={songSheetInfo}
        type={PLAY_LIST_TYPE.songSheet}
      />
      <TabBar activeIndex={activeIndex}>
        {tabList.map((item, index) => {
          return (
            <TabBarItem onClick={() => handleChangeTab(item.id)} key={item.id} id={item.id}>
              {item.title}
            </TabBarItem>
          )
        })}
      </TabBar>
      <div className={style.songSheetContent}>
        {activeIndex === 'playList' && (
          <MuTable
            onColDoubleClick={onColDoubleClick}
            columns={columns}
            data={songSheetInfo?.tracks}
          />
        )}
        {activeIndex === 'comment' && <div>评论</div>}
        {activeIndex === 'favoriter' && <div>收藏者</div>}
      </div>
    </div>
  )
}

export default SongSheet
