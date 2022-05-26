import { useEffect, useState } from 'react'
import { getArtistDetail } from '../service/api/artist'
import { ArtistDetailType, ArtistType } from '../type/artist'
import { SongType } from '../type/song'

export const useArtist = (id = '') => {
  const [artist, setArtist] = useState<ArtistDetailType>({} as ArtistDetailType)

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    getArtistDetail(id)
      .then((res) => {
        setArtist(res.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])
  return [artist, loading] as [ArtistDetailType, boolean]
}
