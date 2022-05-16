import { FunctionComponent, useEffect, useState } from 'react'
import style from './Content.module.css'
import SideBar from '../../../components/sideBar/SideBar'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Home from '../../../pages/home/Home'
import Suggest from '../../../pages/home/suggest/Suggest'
import SongSheet from '../../../pages/songSheet/SongSheet'
import PlayList from '../../../components/playList/PlayList'
import { useSelector } from '../../../redux/hooks'
import { linkItems, LinkItemTypes } from './config'
import SideBarItem from '../../../components/sideBar/sideBarItem/SideBarItem'
import SideBarGroup from '../../../components/sideBar/sideBarGroup/SideBarGroup'
import { FC } from 'react'
import { IconFont } from '../../../assets/css/iconFont'
import { HeartOutlined } from '@ant-design/icons'
import PersonalFm from '../../../pages/personalFm/PersonalFm'
import SongSheets from '../../../pages/songSheets/SongSheets'

const Content: FC = (props) => {
  const curSideOpen = useSelector((state: any) => state.public.curSideOpen)
  const [sideBarItems, setSideBarItems] = useState<LinkItemTypes[]>([])
  const userPlayList = useSelector((state: any) => state.user.userPlayList)
  const userLikeList = useSelector((state: any) => state.user.userLikeList)
  useEffect(() => {
    const _sideBarItems: LinkItemTypes[] = []
    _sideBarItems.push(...linkItems)
    if (userPlayList.length) {
      _sideBarItems.push({
        name: '我的歌单',
        children: userPlayList.map((item: any, idx: number) => {
          return {
            id: item.id,
            name: item.name,
            href: `/songSheet/${item.id}`,
            icon: idx === 0 ? <HeartOutlined /> : <IconFont type={`icon-playlist`} />
          }
        })
      })
    }
    if (userLikeList.length) {
      _sideBarItems.push({
        name: '我的收藏',
        children: userLikeList.map((item: any) => {
          return {
            id: item.id,
            name: item.name,
            href: `/songSheet/${item.id}`,
            icon: <IconFont type={`icon-playlist`} />
          }
        })
      })
    }
    setSideBarItems(_sideBarItems)
  }, [userPlayList, userLikeList])

  return (
    <div className={style.content}>
      <div className={style.siderBar}>
        <SideBar route>
          {sideBarItems.map((item, index) => {
            return item.children ? (
              <SideBarGroup title={item.name} key={index}>
                {item?.children.map((item, index) => {
                  return (
                    <SideBarItem
                      icon={item.icon || null}
                      key={item.href}
                      name={item.name}
                      href={item.href}
                    />
                  )
                })}
              </SideBarGroup>
            ) : (
              <SideBarItem key={item.href} name={item.name} href={item.href} id={item.id} />
            )
          })}
        </SideBar>
      </div>

      <div id='mainContent' className={style.mainPage}>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='' element={<Suggest />} />
            <Route path='/songSheets' element={<Navigate to='/songSheets/default/' />}></Route>
            <Route path='/songSheets/default/' element={<SongSheets />} />
            <Route path='/songSheets/default/:type' element={<SongSheets />} />
            <Route path='/songSheets/boutique/:type' element={<PlayList />} />
          </Route>
          <Route path='/personalfm' element={<PersonalFm />}></Route>
          <Route path='/songSheet/:id' element={<SongSheet />}></Route>
        </Routes>
      </div>
      <div id='rightSideBar' className={style.rightSideContent}>
        {/* 右侧显示的内容：消息列表和播放列表 */}
        {curSideOpen === 'playList' && <PlayList />}
      </div>
    </div>
  )
}

export default Content
