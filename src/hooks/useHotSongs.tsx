import { useEffect, useState } from 'react'
import { getArtistHotsong } from '../service/api/artist'
import { SongType } from '../type/song'

export const useHotSongs = (id = '') => {
  if (!id) return [[], true] as [SongType[], boolean]
  const [hotSongs, setHotSongs] = useState<SongType[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    getArtistHotsong(id).then((res: any) => {
      setHotSongs(res.songs)
      setLoading(false)
    })
  }, [id])
  return [hotSongs, loading] as [SongType[], boolean]
}
