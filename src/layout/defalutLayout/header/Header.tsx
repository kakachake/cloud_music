import { FunctionComponent } from 'react'
import style from './header.module.css'
import logo from '../../../assets/img/logo.png'
import { LeftOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons'
import createLogin from '../../../components/login'
import { useSelector } from '../../../redux/hooks'
import { Link, useNavigate } from 'react-router-dom'
import { IconFont } from '../../../assets/css/iconFont'
const Header: FunctionComponent = () => {
  const handleLogin = () => {
    console.log('login')
    createLogin.create()
  }
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.user.userInfo)
  return (
    <div className={style.header}>
      <div className={style.left}>
        <div className={style.logoWraper}>
          <Link to='/' className={style.logo}>
            <IconFont className={style.icon} type={`icon-wangyiyunyinlelogo-copy`} />
          </Link>
        </div>
        <div className={style.navBar}>
          <div className={style.navBtn}>
            <div onClick={() => navigate(-1)} className={style.iconWrap}>
              <LeftOutlined />
            </div>
            <div onClick={() => navigate(1)} className={style.iconWrap}>
              <RightOutlined />
            </div>
          </div>
          <div className={style.navSearch}>
            <SearchOutlined className={style.searchIcon} />
            <input type='text' />
          </div>
        </div>
      </div>
      <div className={style.right}>
        {userInfo ? (
          <div className={style.loginItem}>
            <Link className={style.loginItem} to='/'>
              <img className={style.avatar} src={userInfo.avatarUrl} alt='' />
              {userInfo.nickname}
            </Link>
          </div>
        ) : (
          <div onClick={handleLogin} className={style.loginItem}>
            未登录
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
