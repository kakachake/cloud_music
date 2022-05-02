import { FunctionComponent } from 'react'
import { Outlet } from 'react-router-dom'
import style from './Home.module.css'
interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div className={style.home}>
      <div className={style.homeHeader}>
        <div className={`${style.headerItem} ${style.active}`}>个性推荐</div>
        <div className={style.headerItem}>歌单</div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Home
