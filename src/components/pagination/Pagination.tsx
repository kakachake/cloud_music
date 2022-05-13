import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { FC, useEffect, useState } from 'react'
import style from './Pagination.module.css'
interface PaginationProps {
  total: number
  pageCurrent?: number
  defaultCurrent?: number
  onChangeCurrentPage?: (page: number) => void
}
const Pagination: FC<PaginationProps> = (props) => {
  const [pagerList, setPagerList] = useState<any>([])
  const { total, defaultCurrent = 1, onChangeCurrentPage, pageCurrent } = props
  const [current, setCurrent] = useState(defaultCurrent)

  useEffect(() => {
    pageCurrent && setCurrent(pageCurrent)
  }, [pageCurrent])
  const changeCurrentPage = (i: number) => {
    setCurrent(i)

    onChangeCurrentPage && onChangeCurrentPage(i)
  }
  useEffect(() => {
    const startIdx = current - 3 > 1 ? (current + 3 < total ? current - 3 : total - 6) : 2
    const endIdx = current + 3 < total ? (current - 3 > 1 ? current + 3 : 8) : total - 1
    const _pagerList = []
    if (current - 3 > 2) {
      _pagerList.push(<div className={style.paginationItem}>…</div>)
    }
    for (let i = startIdx; i <= endIdx; i++) {
      _pagerList.push(
        <div
          className={`${style.paginationItem} ${i === current ? style.active : ''}`}
          onClick={() => {
            changeCurrentPage(i)
          }}
        >
          {i}
        </div>
      )
    }
    if (current + 3 < total - 1) {
      _pagerList.push(<div className={style.paginationItem}>…</div>)
    }
    setPagerList(_pagerList)
  }, [current, total])
  return (
    <div className={style.paginaionWrap}>
      <div
        onClick={() => {
          changeCurrentPage(current - 1)
        }}
        className={style.paginationItem}
      >
        <LeftOutlined />
      </div>
      <div
        onClick={() => {
          changeCurrentPage(1)
        }}
        className={`${style.paginationItem} ${1 === current ? style.active : ''}`}
      >
        1
      </div>
      {pagerList}
      <div
        onClick={() => {
          changeCurrentPage(total)
        }}
        className={`${style.paginationItem} ${total === current ? style.active : ''}`}
      >
        {total}
      </div>
      <div
        onClick={() => {
          changeCurrentPage(current + 1)
        }}
        className={style.paginationItem}
      >
        <RightOutlined />
      </div>
    </div>
  )
}

export default Pagination
