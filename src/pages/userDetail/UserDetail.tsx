import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/loading/Loading'
import { useUserDetail } from '../../hooks/useUserDetail'
import store from '../../redux/store'
import UserInfoHeader, { UserInfo } from '../component/userInfoHeader/UserInfoHeader'
import style from './UserDetail.module.css'
interface UserDetailProps {
  me?: boolean
}

const UserDetail: FC<UserDetailProps> = ({ me = false }) => {
  const id = me ? store.getState().user?.userInfo?.userId : useParams().id
  console.log(id)

  if (!id) return null

  const [userDeatil, loading, error] = useUserDetail(id)
  const [userInfo, setUserInfo] = useState<UserInfo>()

  useEffect(() => {
    if (userDeatil) {
      setUserInfo({
        nikename: userDeatil.profile.nickname,
        avatarUrl: userDeatil.profile.avatarUrl,
        follows: userDeatil.profile.follows,
        eventCount: userDeatil.profile.eventCount,
        followeds: userDeatil.profile.followeds,
        signature: userDeatil.profile.signature
      })
    }
  }, [userDeatil])
  if (loading) return <Loading />
  if (error) return <div>未知用户信息！</div>

  return (
    <div className={style.userDetail}>
      <div className={style.headerInfo}>
        {userInfo && <UserInfoHeader userInfo={userInfo} me />}
      </div>
    </div>
  )
}

export default UserDetail
