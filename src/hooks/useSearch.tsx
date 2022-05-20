import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSearchResult, SEARCH_TYPE } from '../service/api/search'

export const useSearch = (type: SEARCH_TYPE, limit = 20) => {
  const { keyword } = useParams()
  const [searchResult, setSearchResult] = useState<any>({})
  const [curPage, setCurPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getSearchResult(keyword || '', (curPage - 1) * limit, type)
      .then((res) => {
        formatRes(res, type, limit, setSearchResult, setTotalPage)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [keyword, type, curPage])
  return {
    searchResult,
    curPage,
    totalPage,
    setCurPage,
    loading
  }
}

const formatRes = (
  res: any,
  type: SEARCH_TYPE,
  limit: number,
  setSearchResult: any,
  setTotalPage: any
) => {
  const result = res.result

  const parseType = SEARCH_TYPE[type].toLowerCase()
  setSearchResult(result[parseType + 's'])

  setTotalPage(Math.ceil(result[parseType + 'Count'] / limit))
}
