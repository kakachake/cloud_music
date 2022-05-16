import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CommentType } from '../../../type/type'
import { useComment } from '../../../hooks/useComment'
import Comment from '../../../components/comment/Comment'
import style from './Comment.module.css'
import Pagination from '../../../components/pagination/Pagination'
interface CommentTabPageProps {
  songId: string | number
  type: 'Song' | 'PlayList' | 'Album'
  onPageChange?: (page: number) => void
}

const CommentTabPage: FC<CommentTabPageProps> = (props) => {
  const { songId, type, onPageChange } = props
  const { comments, hotComments, curPage, setCurPage, total } = useComment(songId, type)

  return (
    <div className={style.comment}>
      <div className={style.commentTitle}>热门评论 ({total})</div>
      <Comment commentList={hotComments} />
      <div className={style.commentTitle}>全部评论 ({total})</div>
      <Comment commentList={comments} />
      <div className={style.pagination}>
        <Pagination
          onChangeCurrentPage={(cur) => {
            setCurPage(cur)
            onPageChange && onPageChange(cur)
          }}
          total={Math.ceil(total / 20)}
          pageCurrent={curPage}
        />
      </div>
    </div>
  )
}

export default CommentTabPage
