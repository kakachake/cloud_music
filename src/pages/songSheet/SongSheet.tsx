import { FunctionComponent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPlaylistDetail } from '../../service/api/music'
import PlayListHeader from '../component/PlayListHeader/PlayListHeader'

interface SongSheetProps {}

const SongSheet: FunctionComponent<SongSheetProps> = () => {
  const { id } = useParams()
  const [songSheetInfo, setSongSheetInfo] = useState<any>({})
  useEffect(() => {
    getPlaylistDetail(id!).then((res) => {
      setSongSheetInfo(res.playlist)
    })
  }, [])
  return (
    <div>
      <PlayListHeader listInfo={songSheetInfo} type={'歌单'} />
    </div>
  )
}

export default SongSheet
