import { FunctionComponent, useState } from 'react'
import style from './Content.module.css'
import SideBar from '../../../components/sideBar/SideBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../../../pages/home/Home'
import Suggest from '../../../pages/home/suggest/Suggest'
import SongSheet from '../../../pages/songSheet/SongSheet'
import PlayList from '../../../components/playList/PlayList'
import { useSelector } from '../../../redux/hooks'
import { linkItems } from './config'
import SideBarItem from '../../../components/sideBar/sideBarItem/SideBarItem'
import SideBarGroup from '../../../components/sideBar/sideBarGroup/SideBarGroup'
const Content: FunctionComponent = () => {
  const curSideOpen = useSelector((state: any) => state.public.curSideOpen)
  return (
    <div className={style.content}>
      <div className={style.siderBar}>
        <SideBar route>
          {linkItems.map((item, index) => {
            return item.children ? (
              <SideBarGroup title={item.name} key={index}>
                {item?.children.map((item, index) => {
                  return <SideBarItem key={item.href} name={item.name} href={item.href} />
                })}
              </SideBarGroup>
            ) : (
              <SideBarItem key={item.href} name={item.name} href={item.href} id={item.id} />
            )
          })}
        </SideBar>
      </div>
      <div className={style.mainPage}>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='' element={<Suggest />} />
            <Route path='/playList' element={<Suggest />} />
          </Route>
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
