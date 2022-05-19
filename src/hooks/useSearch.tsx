import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSearchResult, SEARCH_TYPE } from '../service/api/search'

export const useSearch = (type: SEARCH_TYPE) => {
  const { keyword } = useParams()
  const [searchResult, setSearchResult] = useState<any>({})
  const [curPage, setCurPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getSearchResult(keyword || '', (curPage - 1) * 20, type)
      .then((res) => {
        formatRes(res, type, setSearchResult, setTotalPage)
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

const formatRes = (res: any, type: SEARCH_TYPE, setSearchResult: any, setTotalPage: any) => {
  const result = res.result

  setSearchResult(result)
}
