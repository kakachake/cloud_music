import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CommentType } from '../../../type/type'
import { useComment } from '../../../hooks/useComment'
import Comment from '../../../components/comment/Comment'
import style from './Comment.module.css'
import Pagination from '../../../components/pagination/Pagination'
interface CommentTabPageProps {
  id: string | number
  type: 'Song' | 'PlayList' | 'Album'
  onPageChange?: (page: number) => void
}

const CommentTabPage: FC<CommentTabPageProps> = (props) => {
  const { id, type, onPageChange } = props
  const { comments, hotComments, curPage, setCurPage, total } = useComment(id, type)
  useEffect(() => {
    onPageChange && onPageChange(curPage)
  }, [curPage])
  return (
    <div className={style.comment}>
      <div className={style.commentTitle}>热门评论 ({total})</div>
      <Comment commentList={hotComments} />
      <div className={style.commentTitle}>全部评论 ({total})</div>
      <Comment commentList={comments} />
      <div className={style.pagination}>
        <Pagination
          onChangeCurrentPage={setCurPage}
          total={Math.ceil(total / 20)}
          pageCurrent={curPage}
        />
      </div>
    </div>
  )
}

export default CommentTabPage
