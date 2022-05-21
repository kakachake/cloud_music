import { FC, useEffect, useState } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { useSearch } from '../../hooks/useSearch'
import { getSearchResult, SEARCH_TYPE } from '../../service/api/search'
import TabBar from '../component/tabBar/TabBar'
import TabBarItem from '../component/tabBar/TabBarItem'
import ArtistTabPage from './artistTabPage/ArtistTabPage'
import PlayListTabPage from './playListTabPage/PlayListTabPage'
import style from './Search.module.css'
import SongTabPage from './songTabPage/SongTabPage'
interface SearchProps {}

const Search: FC<SearchProps> = () => {
  const { keyword } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const curtype = (searchParams.get('type') as any) || SEARCH_TYPE.SONG

  const [type, setType] = useState<SEARCH_TYPE>(+curtype)

  const { searchResult, setCurPage, loading } = useSearch(type)
  const [tabList, setTabList] = useState([
    {
      title: '单曲',
      id: SEARCH_TYPE.SONG
    },
    {
      title: '歌手',
      id: SEARCH_TYPE.ARTIST
    },
    {
      title: '专辑',
      id: SEARCH_TYPE.ALBUM
    },
    {
      title: '歌单',
      id: SEARCH_TYPE.PLAYLIST
    },
    {
      title: '用户',
      id: SEARCH_TYPE.USER
    }
  ])
  const handleChangeTab = (id: SEARCH_TYPE) => {
    setSearchParams('type=' + id.toString())
    setType(id)
  }
  return (
    <div className={style.searchWrap}>
      <div className={style.searchKeyword}>搜索 {keyword}</div>
      <TabBar activeIndex={type}>
        {tabList.map((item, index) => {
          return (
            <TabBarItem onClick={() => handleChangeTab(item.id)} key={item.id} id={item.id}>
              {item.title}
            </TabBarItem>
          )
        })}
      </TabBar>

      {loading ? (
        <div>loading</div>
      ) : (
        <div>
          {type === SEARCH_TYPE.SONG && (
            <SongTabPage setCurPage={setCurPage} data={searchResult?.songs}></SongTabPage>
          )}
          {type === SEARCH_TYPE.ARTIST && (
            <ArtistTabPage setCurPage={setCurPage} data={searchResult?.artists}></ArtistTabPage>
          )}
          {type === SEARCH_TYPE.PLAYLIST && (
            <PlayListTabPage
              setCurPage={setCurPage}
              data={searchResult?.playlists}
            ></PlayListTabPage>
          )}
        </div>
      )}
    </div>
  )
}

export default Search
