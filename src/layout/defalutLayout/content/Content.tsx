import { FunctionComponent } from 'react'
import style from './Content.module.css'
import SideBar from '../../../components/sideBar/SideBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../../../pages/home/Home'
import Suggest from '../../../pages/home/suggest/Suggest'
const Content: FunctionComponent = () => {
  return (
    <div className={style.content}>
      <div className={style.siderBar}>
        <SideBar />
      </div>
      <div className={style.mainPage}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}>
              <Route path='' element={<Suggest />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default Content
