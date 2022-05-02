import React from 'react'
import style from './SideBar.module.css'
import { linkItems } from './config'
interface SideBarProps {}

interface SideBarState {
  activeId: number
}

class SideBar extends React.Component<SideBarProps, SideBarState> {
  constructor(props: SideBarProps) {
    super(props)
    this.state = {
      activeId: 1
    }
  }
  handleLinkClick = (item: any, index: number) => {
    this.setState({
      activeId: item.id
    })
  }
  render() {
    return (
      <div className={style.sideBar}>
        {/* 顶部链接按钮 */}
        <div className={style.linkItem}>
          {linkItems.map((item, index) => {
            return (
              <div
                onClick={() => this.handleLinkClick(item, index)}
                className={`${style.sideBarItem} ${
                  this.state.activeId === item.id ? style.active : ''
                }`}
                key={index}
              >
                <a href={item.href}>{item.name}</a>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default SideBar
