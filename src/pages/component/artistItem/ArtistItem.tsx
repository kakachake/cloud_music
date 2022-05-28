import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Toast from '../../../components/Toast'
import { publicSlice } from '../../../redux/publicSlice/slice'
import store from '../../../redux/store'
import style from './ArtistItem.module.css'
interface ArtistItemProps {
  pic: string
  name: string
  id: number
  hasHome?: boolean
}

const ArtistItem: FC<ArtistItemProps> = ({ pic, name, id, hasHome = false }) => {
  const navigate = useNavigate()
  const handleToArtist = () => {
    console.log(id)

    if (+id === 0) {
      Toast.error('暂无该歌手信息！')
      return
    }
    navigate('/artist/' + id)
  }
  return (
    <div onClick={handleToArtist} className={style.artistItem}>
      <div className={style.artistItemPic}>
        <img src={pic + '?param=300y300'} alt='' />
      </div>
      <div className={style.artistItemName}>{name}</div>
    </div>
  )
}

export default ArtistItem
