import { FC, useEffect } from 'react'
import { CommentType } from '../../type/type'
import CommentItem from './CommentItem'
import style from './Comment.module.css'
interface CommentProps {
  commentList: CommentType[]
}

const Comment: FC<CommentProps> = (props) => {
  const { commentList } = props
  return (
    <div className={style.commentWrap}>
      {commentList?.map((item, index) => {
        return (
          <div className={style.commentItem} key={index}>
            <CommentItem comment={item} />
          </div>
        )
      })}
    </div>
  )
}

export default Comment
