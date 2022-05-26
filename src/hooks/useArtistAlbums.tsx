import { useEffect, useState } from 'react'
import { getAlbumDetail } from '../service/api/album'
import { getArtistAlbums } from '../service/api/artist'
import { AlbumType } from '../type/album'

export const useArtistAlbums = (id = '') => {
  if (!id) return [[], true] as [AlbumType[], boolean]
  const [albums, setAlbums] = useState<AlbumType[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    getArtistAlbums(id).then((res: any) => {
      res.hotAlbums.map(async (item: any) => {
        await getAlbumDetail(item.id).then(({ songs }) => {
          item.songs = songs
        })
        setAlbums((albums) => {
          return [...albums, item]
        })
      })
    })
    setLoading(false)
  }, [id])
  return [albums, loading] as [AlbumType[], boolean]
}
