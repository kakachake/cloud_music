import { FC } from 'react'
import style from './UserInfoHeader.module.less'
export interface UserInfo {
  nikename: string
  avatarUrl: string
  // 关注数
  follows: number
  // 动态数
  eventCount: number
  // 粉丝数
  followeds: number
  // 简介
  signature: string
}

interface UserInfoHeaderProps {
  userInfo: UserInfo
  me?: boolean
}

const UserInfoHeader: FC<UserInfoHeaderProps> = (props) => {
  const { userInfo, me } = props
  return (
    <div className={`${style.contentWrap} `}>
      <div className={style.avatar}>
        <img src={userInfo.avatarUrl} alt='' />
      </div>
      <div className={style.right}>
        <div className={style.nikename}>{userInfo.nikename}</div>
      </div>
    </div>
  )
}

export default UserInfoHeader
