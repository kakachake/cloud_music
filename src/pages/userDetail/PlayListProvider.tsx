import React, { FC, useEffect, useState } from 'react'
import Loading from '../../components/loading/Loading'
import PlayListPreviewCard from '../../components/playListPreviewCard/PlayListPreviewCard'
import { getPlaylistDetail } from '../../service/api/music'
import { SongSheetType } from '../../type/songSheet'

interface PlayListProviderProps {
  playList: any
}

const PlayListProvider: FC<PlayListProviderProps> = (props) => {
  const { playList } = props
  const [playListDetail, setPlayListDetail] = useState<SongSheetType>()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const { id } = playList
    getPlaylistDetail(id)
      .then((res) => {
        setPlayListDetail(res.playlist)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [playList])

  return (
    <>
      {
        <PlayListPreviewCard
          title={playList?.name}
          songs={playListDetail?.tracks || []}
          pic={playList?.coverImgUrl}
          type='playList'
          id={playList.id}
        />
      }
    </>
  )
  // return <div>1</div>
}

export default PlayListProvider
