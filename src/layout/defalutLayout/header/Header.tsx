import { FunctionComponent } from 'react'
import style from './header.module.css'
import logo from '../../../assets/img/logo.png'
import { LeftOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons'
const Header: FunctionComponent = () => {
  return (
    <div className={style.header}>
      <div className={style.left}>
        <div className={style.logoWraper}>
          <a href='/' className={style.logo}>
            <img src={logo} alt='网易云音乐' />
          </a>
        </div>
        <div className={style.navBar}>
          <div className={style.navBtn}>
            <div onClick={() => history.back()} className={style.iconWrap}>
              <LeftOutlined />
            </div>
            <div onClick={() => history.forward()} className={style.iconWrap}>
              <RightOutlined />
            </div>
          </div>
          <div className={style.navSearch}>
            <SearchOutlined className={style.searchIcon} />
            <input type='text' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
