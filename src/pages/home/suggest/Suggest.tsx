import { FunctionComponent, useEffect, useState } from 'react'
import { getPersonalizedSongSheets } from '../../../service/api/music'
import { SongSheetsType } from '../../../service/api/type'
import LinkTab from '../../component/linkTab/LinkTab'
import SongSheetItem from '../../component/songSheetItem/SongSheetItem'
import style from './Suggest.module.css'
interface SuggestProps {}

const Suggest: FunctionComponent<SuggestProps> = () => {
  const [songSheets, setSongSheets] = useState<SongSheetsType[]>([])
  useEffect(() => {
    getPersonalizedSongSheets().then((res) => {
      setSongSheets(res.result)
    })
  }, [])
  return (
    <div className={style.suggest}>
      <LinkTab title='推荐歌单' to='/' />
      <div className={style.suggestContent}>
        {songSheets.map((item) => (
          <SongSheetItem songSheetInfo={item} key={item.id} />
        ))}
      </div>
    </div>
  )
}

export default Suggest
