import { useEffect, useState } from 'react'
import { getPlaylistComment, getSongComment } from '../service/api/music'
import { CommentType } from '../type/type'

export const useComment = (id: string | number, type: 'Song' | 'PlayList' | 'Album') => {
  const [comments, setComments] = useState<CommentType[]>([])
  const [hotComments, setHotComments] = useState<CommentType[]>([])
  const [curPage, setCurPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    ;(async () => {
      let res: any = {}
      switch (type) {
        case 'Song':
          res = await getSongComment(id, curPage)
          break
        case 'PlayList':
          res = await getPlaylistComment(id, curPage)
          break
        case 'Album':
          break
      }
      if (res.hotComments) {
        setHotComments(res.hotComments)
      }
      setComments(res.comments)
      setTotal(res.total)
    })()
  }, [curPage, id])
  useEffect(() => {
    setCurPage(1)
  }, [id])
  return { comments, hotComments, curPage, setCurPage, total, loading, setLoading }
}
