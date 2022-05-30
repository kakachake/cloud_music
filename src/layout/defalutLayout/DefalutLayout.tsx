import { FunctionComponent } from 'react'
import Header from './header/Header'
import MusicBar from './musicBar/MusicBar'
import Content from './content/Content'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../../pages/home/Home'
import { CSSTransition } from 'react-transition-group'
import MusicDetail from './MusicDetail/MusicDetail'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import style from './Default.module.css'
import HandTrack from '../../components/handtrack/HandTrack'
import Suggest from '../../pages/home/suggest/Suggest'
import SongSheets from '../../pages/home/songSheets/SongSheets'
import HighQuality from '../../pages/HighQuality/HighQuality'
import Rank from '../../pages/home/rank/Rank'
import PersonalFm from '../../pages/personalFm/PersonalFm'
import SongSheet from '../../pages/songSheet/SongSheet'
import Album from '../../pages/album/Album'
import Artist from '../../pages/artist/Artist'
import Search from '../../pages/search/Search'
import Artists from '../../pages/home/artists/Artists'
import VideoDetail from '../../pages/videoDetail/VideoDetail'
const DefaultLayout: FunctionComponent = () => {
  const songDetailOpen = useSelector((state: RootState) => state.public.songDetailOpen)
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Content />}>
          <Route path='/' element={<Home />}>
            <Route path='' element={<Suggest />} />
            <Route path='/songSheets' element={<Navigate to='/songSheets/default/' />}></Route>
            <Route path='/songSheets/default/' element={<SongSheets />} />
            <Route path='/songSheets/default/:type' element={<SongSheets />} />
            <Route path='/songSheets/highquality/:type' element={<HighQuality />} />
            <Route path='/rank' element={<Rank />} />
            <Route path='/Artists' element={<Artists />} />
          </Route>
          <Route path='/personalfm' element={<PersonalFm />}></Route>
          <Route path='/songSheet/:id' element={<SongSheet />}></Route>
          <Route path='/album/:id' element={<Album />}></Route>
          <Route path='/search/:keyword' element={<Search />}></Route>
          <Route path='/artist/:id' element={<Artist />}></Route>
          <Route path='/mv/:id' element={<div>mv</div>}></Route>
        </Route>
        <Route path='/' element={<Content hiddenSideBar={true} />}>
          <Route path='/videoDetail/:id' element={<VideoDetail />}></Route>
        </Route>
      </Routes>
      {/* <Content /> */}
      <MusicBar />
      <CSSTransition in={songDetailOpen} timeout={300} classNames='musicDetail' unmountOnExit>
        <MusicDetail />
      </CSSTransition>
      {/* <HandTrack /> */}
    </div>
  )
}

export default DefaultLayout
