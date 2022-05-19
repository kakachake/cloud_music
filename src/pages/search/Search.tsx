import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSearch } from '../../hooks/useSearch'
import { getSearchResult, SEARCH_TYPE } from '../../service/api/search'
import TabBar from '../component/tabBar/TabBar'
import TabBarItem from '../component/tabBar/TabBarItem'
import style from './Search.module.css'
interface SearchProps {}

const Search: FC<SearchProps> = () => {
  const { keyword } = useParams()
  const [type, setType] = useState<SEARCH_TYPE>(SEARCH_TYPE.SONG)
  const { searchResult, curPage, totalPage, setCurPage, loading } = useSearch(type)
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
    setType(id)
  }
  return (
    <div className={style.searchWrap}>
      {keyword}
      {type}
      <TabBar activeIndex={type}>
        {tabList.map((item, index) => {
          return (
            <TabBarItem onClick={() => handleChangeTab(item.id)} key={item.id} id={item.id}>
              {item.title}
            </TabBarItem>
          )
        })}
      </TabBar>
      {loading ? <div>loading</div> : <div>{JSON.stringify(searchResult)}</div>}
    </div>
  )
}

export default Search
