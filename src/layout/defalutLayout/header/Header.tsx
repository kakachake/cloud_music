import { FunctionComponent, useState } from 'react'
import style from './header.module.css'
import './header.transition.css'
import logo from '../../../assets/img/logo.png'
import {
  BorderOutlined,
  CloseOutlined,
  LeftOutlined,
  MinusOutlined,
  RightOutlined,
  SearchOutlined
} from '@ant-design/icons'
import createLogin from '../../../components/login'
import { CSSTransition } from 'react-transition-group'
import { useSelector } from '../../../redux/hooks'
import { Link, useNavigate } from 'react-router-dom'
import { IconFont } from '../../../assets/css/iconFont'
import store, { RootState } from '../../../redux/store'
import { publicSlice } from '../../../redux/publicSlice/slice'
import { getHotSearch } from '../../../service/api/search'
let electron: any
try {
  electron = window.require('electron')
} catch (error) {}

const Header: FunctionComponent = () => {
  const songDetailOpen = useSelector((state: RootState) => state.public.songDetailOpen)
  const [hotSearch, setHotSearch] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [showTip, setShowTip] = useState(false)
  const handleLogin = () => {
    console.log('login')
    createLogin.create()
  }
  function closeWin() {
    electron.ipcRenderer.send('window-close')
  }
  function maximize() {
    electron.ipcRenderer.send('window-maximize')
  }
  function minimize() {
    electron.ipcRenderer.send('window-minimize')
  }
  const navigate = useNavigate()
  const handleNavigate = (direction: number) => {
    navigate(direction)
    store.dispatch(publicSlice.actions.setSongDetailOpen(false))
  }
  const userInfo = useSelector((state) => state.user.userInfo)
  const handleGetHotSearch = () => {
    setShowTip(true)
    getHotSearch().then((res) => {
      setHotSearch(res.data)
    })
  }
  const handleSearch = (searchText?: string) => {
    if (searchText === undefined && searchInput === '') {
      return
    }
    setShowTip(false)
    navigate(`/search/${searchText || searchInput}`)
  }
  const clickHot = (item: any) => {
    setSearchInput(item)
    handleSearch(item)
  }
  return (
    <div className={style.dragWrap}>
      <div className={style.header}>
        <div className={style.logoWraper}>
          <Link to='/' className={style.logo}>
            <IconFont className={style.icon} type={`icon-wangyiyunyinlelogo-copy`} />
          </Link>
        </div>
        <div className={`${style.left} ${songDetailOpen ? style.leftOpenStyle : ''}`}>
          <div className={style.navBar}>
            <div className={style.navBtn}>
              <div onClick={() => handleNavigate(-1)} className={style.iconWrap}>
                <LeftOutlined />
              </div>
              <div onClick={() => handleNavigate(1)} className={style.iconWrap}>
                <RightOutlined />
              </div>
            </div>
            <div
              onBlur={() => {
                setShowTip(false)
              }}
              onFocus={() => {
                handleGetHotSearch()
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  handleSearch()
                }
              }}
              className={style.navSearch}
            >
              <SearchOutlined onClick={() => handleSearch()} className={style.searchIcon} />
              <input
                value={searchInput}
                onInput={(e: any) => {
                  setSearchInput(e.target.value)
                }}
                type='text'
              />
              <CSSTransition in={showTip} timeout={300} classNames='showTip' unmountOnExit>
                <div className={style.searchInfoTipWrap}>
                  <div className={style.hotSearch}>
                    <div className={style.hotSearchTitle}>热搜榜</div>
                    <div className={style.hotSearchList}>
                      {hotSearch.map((item: any, index: number) => {
                        return (
                          <div
                            onClick={() => clickHot(item.searchWord)}
                            className={style.hotSearchItem}
                            key={item.first}
                          >
                            <div
                              className={`${style.hotItemIndex} ${
                                index < 3 ? style['hotItemIndex' + index] : ''
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div className={style.hotItemInfo}>
                              <div className={style.hotItemKeyWord}>
                                <span
                                  className={`${style.hotItemSearchWord} ${
                                    index < 3 ? style.hotSearchBold : ''
                                  }`}
                                >
                                  {item.searchWord}
                                </span>
                                <span className={style.hotItemScore}>{item.score}</span>
                              </div>
                              {item.content && (
                                <div className={style.hotItemContent}>
                                  <span>{item.content}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CSSTransition>
            </div>
          </div>
        </div>
        <div className={style.right}>
          {userInfo ? (
            <Link className={style.loginItem} to='/'>
              <img className={style.avatar} src={userInfo.avatarUrl} alt='' />
              <div>{userInfo.nickname}</div>
            </Link>
          ) : (
            <div onClick={handleLogin} className={style.loginItem}>
              未登录
            </div>
          )}
          {electron?.ipcRenderer && (
            <div className={style.eletronControlIcon}>
              <div className={style.eletronControlIconItem} onClick={() => minimize()}>
                <MinusOutlined />
              </div>
              <div className={style.eletronControlIconItem} onClick={() => maximize()}>
                <BorderOutlined />
              </div>
              <div className={style.eletronControlIconItem} onClick={() => closeWin()}>
                <CloseOutlined />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
