import { FunctionComponent } from 'react'
import Header from './header/Header'
import MusicBar from './musicBar/MusicBar'
import Content from './content/Content'
import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/home/Home'
import { CSSTransition } from 'react-transition-group'
import MusicDetail from './MusicDetail/MusicDetail'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import style from './Default.module.css'
import HandTrack from '../../components/handtrack/HandTrack'
const DefaultLayout: FunctionComponent = () => {
  const songDetailOpen = useSelector((state: RootState) => state.public.songDetailOpen)
  return (
    <div>
      <Header />
      <Content />
      <MusicBar />
      <CSSTransition in={songDetailOpen} timeout={300} classNames='musicDetail' unmountOnExit>
        <MusicDetail />
      </CSSTransition>
      <HandTrack />
    </div>
  )
}

export default DefaultLayout
