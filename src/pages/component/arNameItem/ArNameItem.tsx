import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Toast from '../../../components/Toast'
import { publicSlice } from '../../../redux/publicSlice/slice'
import store from '../../../redux/store'
import style from './ArNameItem.module.css'
interface ArNameItemProps {
  artists: any[]
}
const ArNameItem: FC<ArNameItemProps> = ({ artists }) => {
  const navigate = useNavigate()
  const handleToAr = (id: string) => {
    console.log(id)

    if (+id === 0) {
      Toast.error('暂无该歌手信息！')
      return
    }
    store.dispatch(publicSlice.actions.setSongDetailOpen(false))
    navigate('/artist/' + id)
  }
  return (
    <div className={style.arNameWrap}>
      {artists?.map((item: any, idx: number) => (
        <div style={{ display: 'inline-block' }} key={item.id}>
          <span style={{ margin: '0 5px' }}>{idx > 0 ? '/' : ''}</span>
          <span className={style.nameItem} onClick={() => handleToAr(item.id)}>
            {item.name}
          </span>
        </div>
      ))}
    </div>
  )
}

export default ArNameItem
